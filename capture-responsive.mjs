import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";

const chrome = spawn("C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", [
  "--headless=new",
  "--remote-debugging-port=9222",
  "--user-data-dir=" + process.env.TEMP + "\\chrome-screenshots",
  "http://localhost:3000",
]);

const devices = [
  { name: "320", width: 320, height: 600, scale: 2, mobile: true },
  { name: "390", width: 390, height: 844, scale: 3, mobile: true },
  { name: "768", width: 768, height: 1024, scale: 2, mobile: false },
  { name: "1024", width: 1024, height: 800, scale: 2, mobile: false },
  { name: "1440", width: 1440, height: 900, scale: 1, mobile: false },
];

setTimeout(async () => {
  try {
    const listRes = await fetch("http://127.0.0.1:9222/json");
    const pages = await listRes.json();
    const target = pages.find((p) => p.url.includes("localhost:3000")) || pages[0];
    const ws = new WebSocket(target.webSocketDebuggerUrl);

    let currentIdx = 0;
    let msgId = 1;

    function sendCommand(method, params = {}) {
      const id = msgId++;
      ws.send(JSON.stringify({ id, method, params }));
      return id;
    }

    ws.onopen = () => {
      runDevice(devices[0]);
    };

    function runDevice(dev) {
      console.log(`Setting device metrics: ${dev.name}px (${dev.width}x${dev.height})...`);
      sendCommand("Emulation.setDeviceMetricsOverride", {
        width: dev.width,
        height: dev.height,
        deviceScaleFactor: dev.scale,
        mobile: dev.mobile,
      });

      // Wait a moment for layout to settle then take screenshot
      setTimeout(() => {
        sendCommand("Page.captureScreenshot", {
          format: "png",
        });
      }, 500);
    }

    ws.onmessage = async (event) => {
      const data = JSON.parse(event.data);
      if (data.result && data.result.data) {
        // Screenshot data received (base64)
        const dev = devices[currentIdx];
        const outPath = path.join(process.cwd(), `device-${dev.name}.png`);
        await fs.writeFile(outPath, Buffer.from(data.result.data, "base64"));
        const stats = await fs.stat(outPath);
        console.log(`  Saved device-${dev.name}.png: ${stats.size} bytes`);

        currentIdx++;
        if (currentIdx < devices.length) {
          runDevice(devices[currentIdx]);
        } else {
          console.log("All device screenshots captured successfully!");
          ws.close();
          chrome.kill();
          process.exit(0);
        }
      }
    };
  } catch (err) {
    console.error("Screenshot capture error:", err);
    chrome.kill();
    process.exit(1);
  }
}, 2000);
