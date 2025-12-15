//
//  NotificationService.swift
//  InsiderNotificationService
//
//  Created by Insider on 15.12.2025.
//

import UserNotifications
import InsiderMobileAdvancedNotification

// FIXME-INSIDER: Please change with your app group.
let APP_GROUP = "group.com.useinsider.mobile-ios"

class NotificationService: UNNotificationServiceExtension {

    var contentHandler: ((UNNotificationContent) -> Void)?
    var bestAttemptContent: UNMutableNotificationContent?
    var receivedRequest: UNNotificationRequest?

    override func didReceive(_ request: UNNotificationRequest, withContentHandler contentHandler: @escaping (UNNotificationContent) -> Void) {
        self.contentHandler = contentHandler
        bestAttemptContent = (request.content.mutableCopy() as? UNMutableNotificationContent)
        receivedRequest = request

        if let bestAttemptContent = bestAttemptContent {
            let nextButtonText = ">>"
            let goToAppText = "Launch App"

            InsiderPushNotification.showInsiderRichPush(
                bestAttemptContent,
                appGroup: APP_GROUP,
                nextButtonText: nextButtonText,
                goToAppText: goToAppText,
                success: { attachment in
                    if let attachment = attachment {
                        bestAttemptContent.attachments = bestAttemptContent.attachments + [attachment as UNNotificationAttachment]
                    }
                    contentHandler(bestAttemptContent)
            })
        }
    }
    
    override func serviceExtensionTimeWillExpire() {
        if let contentHandler = contentHandler, let bestAttemptContent =  bestAttemptContent {
            InsiderPushNotification.serviceExtensionTimeWillExpire(receivedRequest, content: bestAttemptContent)
            contentHandler(bestAttemptContent)
        }
    }
}
