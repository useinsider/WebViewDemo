plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
}

android {
    namespace = "com.useinsider.webviewdemo"
    compileSdk {
        version = release(36)
    }

    defaultConfig {
        // FIXME-INSIDER: Please change with your application ID.
        applicationId = "com.useinsider.ecommerce"
        minSdk = 24
        targetSdk = 36
        versionCode = 1
        versionName = "1.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"

        // FIXME-INSIDER: Please change with your partner name.
        manifestPlaceholders["partner"] = "your_partner_name"
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_11
        targetCompatibility = JavaVersion.VERSION_11
    }
    kotlinOptions {
        jvmTarget = "11"
    }
}

dependencies {
    implementation(libs.androidx.core.ktx)
    implementation(libs.androidx.appcompat)
    implementation(libs.material)
    implementation(libs.androidx.activity)
    implementation(libs.androidx.constraintlayout)
    implementation(libs.androidx.webkit)
    implementation(libs.insider)
    implementation(libs.insider.webView)

    implementation(libs.androidx.security.crypto)
    implementation(libs.androidx.legacy.support.v4)
    implementation(libs.androidx.lifecycle.process)
    implementation(libs.androidx.work.runtime)

    implementation(libs.firebase.messaging)
    implementation(libs.play.services.location)
    implementation(libs.play.review)
}

apply(from = "build-webpage.gradle.kts")