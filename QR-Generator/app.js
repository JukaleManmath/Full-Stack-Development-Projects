document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.querySelector(".url");
    const generateBtn = document.getElementById("url-btn");
    const qrContainer = document.querySelector(".qr-container");
    const qrCodeDiv = document.createElement("div");
    
    let qr;

    generateBtn.addEventListener("click", () => {
        qrContainer.innerHTML = "";
        qrCodeDiv.id = "qrcode";
        qrContainer.appendChild(qrCodeDiv);
    
        const url = inputField.value.trim();

        if (!url) {
            alert("Please enter a valid URL");
            return ;
        }

        generateQRCode(url);
    });

    function generateQRCode(url) {
        // Clear previous QR code
        qrCodeDiv.innerHTML = "";
        
        // Generate new QR code
        qr = new QRCode(qrCodeDiv, {
            text: url,
            width: 200,
            height: 200,
            colorDark: "#000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });

        // Show download and share buttons
        addDownloadAndShareButtons();
    }

    function addDownloadAndShareButtons() {
        // Remove previous buttons if they exist
        document.querySelectorAll(".action-btn").forEach(btn => btn.remove());

        let downloadBtn = document.createElement("button");
        downloadBtn.textContent = "Download ⬇️";
        downloadBtn.className = "button action-btn";

        let shareBtn = document.createElement("button");
        shareBtn.textContent = "Share 🔗";
        shareBtn.className = "button action-btn";

        let buttonContainer = document.createElement("div");
        buttonContainer.style.marginTop = "40px";
        buttonContainer.style.display = "flex";
        buttonContainer.style.gap = "40px";
        buttonContainer.style.justifyContent = "center";


        // Download functionality
        downloadBtn.addEventListener("click", () => {
            let qrCanvas = qrCodeDiv.querySelector("canvas");
            if (qrCanvas) {
                let link = document.createElement("a");
                link.href = qrCanvas.toDataURL("image/png");
                link.download = "qrcode.png";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        });

        // Share functionality
        shareBtn.addEventListener("click", async () => {
            let qrCanvas = qrCodeDiv.querySelector("canvas");
            if (navigator.clipboard && qrCanvas) {
                let qrImage = qrCanvas.toDataURL("image/png");
                try {
                    const blob = await fetch(qrImage).then(res => res.blob());
                    const item = new ClipboardItem({ "image/png": blob });
                    await navigator.clipboard.write([item]);
                    alert("QR Code copied to clipboard!");
                } catch (error) {
                    console.error("Error copying QR code:", error);
                }
            } else {
                alert("Clipboard sharing is not supported on your device.");
            }
        });

        buttonContainer.appendChild(downloadBtn);
        buttonContainer.appendChild(shareBtn);
        qrContainer.appendChild(buttonContainer);
    }
});
