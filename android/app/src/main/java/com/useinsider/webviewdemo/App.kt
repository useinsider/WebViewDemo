package com.useinsider.webviewdemo

import android.app.Application
import android.util.Log
import com.useinsider.insider.Insider
import com.useinsider.insider.InsiderCallbackType

// FIXME-INSIDER: Please edit this part according to your partner names.
const val PARTNER_NAME = "your_partner_name"

class App : Application() {
    override fun onCreate() {
        super.onCreate()

        Insider.Instance.init(this, PARTNER_NAME)

        Insider.Instance.registerInsiderCallback { data, callbackType ->
            when (callbackType) {
                InsiderCallbackType.NOTIFICATION_OPEN ->
                    Log.d("[INSIDER]", "[NOTIFICATION_OPEN]: $data")

                InsiderCallbackType.INAPP_BUTTON_CLICK ->
                    Log.d("[INSIDER]", "[INAPP_BUTTON_CLICK]: $data")

                InsiderCallbackType.TEMP_STORE_PURCHASE ->
                    Log.d("[INSIDER]", "[TEMP_STORE_PURCHASE]: $data")

                InsiderCallbackType.TEMP_STORE_ADDED_TO_CART ->
                    Log.d("[INSIDER]", "[TEMP_STORE_ADDED_TO_CART]: $data")

                InsiderCallbackType.TEMP_STORE_CUSTOM_ACTION ->
                    Log.d("[INSIDER]", "[TEMP_STORE_CUSTOM_ACTION]: $data")

                else -> {}
            }
        }
    }
}