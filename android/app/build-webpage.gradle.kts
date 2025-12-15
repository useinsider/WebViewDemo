import org.gradle.process.ExecOperations
import javax.inject.Inject

val webviewDir = "${rootDir}/.."

abstract class ExecHelper @Inject constructor(
    private val execOps: ExecOperations
) {
    fun findNpm(): String? {
        val osName = System.getProperty("os.name").lowercase()
        val command = if (osName.contains("windows")) listOf("where", "npm") else listOf("which", "npm")

        val npmPathOutput = java.io.ByteArrayOutputStream()
        val npmPathErrorOutput = java.io.ByteArrayOutputStream()

        val result = execOps.exec {
            commandLine(command)
            standardOutput = npmPathOutput
            errorOutput = npmPathErrorOutput
            isIgnoreExitValue = true
        }

        if (result.exitValue != 0) {
            return null
        }
        val npmPath = npmPathOutput.toString().trim()
        return npmPath.ifEmpty { null }
    }
}

tasks.register("verifyNode") {
    group = "build"
    description = "Verifies Node.js availability on the current device."

    doLast {
        // Check if the submodule is cloned
        val webpageDir = file(webviewDir)
        val packageJson = file("$webviewDir/package.json")
        if (!webpageDir.exists() || !packageJson.exists()) {
            throw GradleException("Missing 'package.json'. Make sure the repo is cloned correctly.")
        }

        // Check if Node.js (npm) is installed
        val helper = project.objects.newInstance(ExecHelper::class.java)
        val npmCommand = helper.findNpm()
        if (npmCommand == null) {
            throw GradleException("Node was not found. Install Node.js (https://nodejs.org/) to continue.")
        }
        val result = project.exec {
            commandLine(npmCommand, "--version")
            isIgnoreExitValue = true
        }
        if (result.exitValue != 0) {
            throw GradleException("Node.js is not working correctly. Please check your installation.")
        }

        println("Verified Node.js and npm at: $npmCommand")
    }
}

tasks.register<Exec>("installPackages") {
    group = "build"
    description = "Installs npm dependencies for the web page."

    inputs.file("$webviewDir/package.json")
    outputs.dir("$webviewDir/node_modules")

    workingDir(file(webviewDir))

    doFirst {
        val helper = project.objects.newInstance(ExecHelper::class.java)
        val npmCommand = helper.findNpm() ?: throw GradleException("npm not found")
        commandLine(npmCommand, "install")
    }

    dependsOn("verifyNode")
}

tasks.register<Exec>("buildWebpage") {
    group = "build"
    description = "Builds the web page that will be used in the project."

    inputs.dir("$webviewDir/src")
    outputs.dir("$webviewDir/dist")

    workingDir(file(webviewDir))

    doFirst {
        val helper = project.objects.newInstance(ExecHelper::class.java)
        val npmCommand = helper.findNpm() ?: throw GradleException("npm not found")
        commandLine(npmCommand, "run", "build")
    }

    dependsOn("installPackages")
}

tasks.matching { it.name == "preBuild" }.configureEach {
    dependsOn("buildWebpage")
}
