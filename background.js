// Define a set to track injected tabs
let _0x5b7e = new Set();

// Function to send messages to YouTube tabs
function _0x3f3e(_0x6e4e) {
    chrome.tabs.query({ url: "*://*.youtube.com/*" }, function (_0x5c2e) {
        _0x5c2e.forEach(function (_0x456e) {
            if (!_0x5b7e.has(_0x456e.id)) {
                chrome.scripting.executeScript(
                    {
                        target: { tabId: _0x456e.id },
                        files: ['content.js']
                    },
                    function () {
                        if (chrome.runtime.lastError) {
                            console.error(`Script injection failed: ${chrome.runtime.lastError.message}`);
                            return;
                        }
                        _0x5b7e.add(_0x456e.id);
                        chrome.tabs.sendMessage(_0x456e.id, _0x6e4e, function (_0x1234) {
                            if (chrome.runtime.lastError) {
                                console.error(`Message sending failed: ${chrome.runtime.lastError.message}`);
                            }
                        });
                    }
                );
            } else {
                chrome.tabs.sendMessage(_0x456e.id, _0x6e4e, function (_0x1234) {
                    if (chrome.runtime.lastError) {
                        console.error(`Message sending failed: ${chrome.runtime.lastError.message}`);
                    }
                });
            }
        });
    });
}

// Listen for tab activation events
chrome.tabs.onActivated.addListener(function (_0x5678) {
    chrome.tabs.get(_0x5678.tabId, function (_0x7890) {
        if (!_0x7890.url.includes("youtube.com")) {
            _0x3f3e({ action: "pauseVideo" });
        }
    });
});

// Listen for tab update events
chrome.tabs.onUpdated.addListener(function (_0x7890, _0x3456, _0x2345) {
    if (_0x3456.status === "complete" && _0x2345.url.includes("youtube.com")) {
        _0x3f3e({ action: "pauseVideo" });
    }
});
