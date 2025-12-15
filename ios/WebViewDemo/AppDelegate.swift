//
//  AppDelegate.swift
//  WebViewDemo
//
//  Created by Insider on 15.12.2025.
//

import UIKit
import InsiderMobile
import InsiderGeofence

// FIXME-INSIDER: Please change with your app group.
let APP_GROUP = "group.com.useinsider.mobile-ios"

// FIXME-INSIDER: Please change with your partner name.
// Make sure that all the letters are lowercase.
let INSIDER_PARTNER_NAME = "your_partner_name"

@main
class AppDelegate: UIResponder, UIApplicationDelegate, UNUserNotificationCenterDelegate {
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        UNUserNotificationCenter.current().delegate = self

        Insider.initWithLaunchOptions(launchOptions, partnerName: INSIDER_PARTNER_NAME, appGroup: APP_GROUP)
        Insider.setActiveForegroundPushView()
        Insider.register(withQuietPermission: false)
        Insider.registerCallback(with: #selector(insiderCallbackHandler(info:)), sender: self)
        Insider.enableIDFACollection(false);

        return true
    }

    func showAlertAction(title: String, message: String) {
        if let windowScene = UIApplication.shared.connectedScenes.first as? UIWindowScene, let rootViewController = windowScene.windows.first?.rootViewController {
            let alert = UIAlertController(title: title, message: message, preferredStyle: UIAlertController.Style.alert)
            alert.addAction(UIAlertAction(title: "OK", style: UIAlertAction.Style.default, handler: nil))
            rootViewController.present(alert, animated: true, completion: nil)
        }
    }

    @objc func insiderCallbackHandler(info: [String : AnyObject]) {
        let type = info["type"]?.intValue ?? -1
        switch type {
        case InsiderCallbackType.notificationOpen.rawValue:
            let callback = String(describing: info)
            showAlertAction(title: "InsiderCallbackTypeNotificationOpen", message: callback)
            break
        case InsiderCallbackType.tempStoreCustomAction.rawValue:
            let callback = String(describing: info)
            showAlertAction(title: "InsiderCallbackTypeTempStoreCustomAction", message: callback)
            break
        default:
            print(info)
            break
        }
    }

    // MARK: UISceneSession Lifecycle

    func application(_ application: UIApplication, configurationForConnecting connectingSceneSession: UISceneSession, options: UIScene.ConnectionOptions) -> UISceneConfiguration {
        // Called when a new scene session is being created.
        // Use this method to select a configuration to create the new scene with.
        return UISceneConfiguration(name: "Default Configuration", sessionRole: connectingSceneSession.role)
    }

    func application(_ application: UIApplication, didDiscardSceneSessions sceneSessions: Set<UISceneSession>) {
        // Called when the user discards a scene session.
        // If any sessions were discarded while the application was not running, this will be called shortly after application:didFinishLaunchingWithOptions.
        // Use this method to release any resources that were specific to the discarded scenes, as they will not return.
    }
}
