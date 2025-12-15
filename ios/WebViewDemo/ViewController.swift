//
//  ViewController.swift
//  WebViewDemo
//
//  Created by Insider on 15.12.2025.
//

import UIKit
import WebKit
import InsiderMobile
import InsiderWebView

class ViewController: UIViewController {
    @IBOutlet weak var webView: WKWebView!

    override func viewDidLoad() {
        super.viewDidLoad()

        if #available(iOS 16.4, *) {
            webView.isInspectable = true
        }

        Insider.setupWebViewSDK(on: webView)

        if let htmlPath = Bundle.main.path(forResource: "index", ofType: "html") {
            let url = URL(fileURLWithPath: htmlPath)
            webView.loadFileURL(url, allowingReadAccessTo: url.deletingLastPathComponent())
        }
    }
}
