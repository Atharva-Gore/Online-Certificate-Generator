const form = document.getElementById("certForm");
const canvas = document.getElementById("certificateCanvas");
const ctx = canvas.getContext("2d");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const course = document.getElementById("course").value;
  const date = document.getElementById("date").value;

  const bg = new Image();
  bg.src = "templates/template1.png"; // Replace with your certificate template

  bg.onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

    ctx.font = "40px serif";
    ctx.fillStyle = "#000";
    ctx.textAlign = "center";

    ctx.fillText(name, canvas.width / 2, 320);
    ctx.font = "28px serif";
    ctx.fillText(`for completing ${course}`, canvas.width / 2, 380);
    ctx.fillText(`Date: ${date}`, canvas.width / 2, 440);
  };
});

document.getElementById("downloadImage").addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "certificate.png";
  link.href = canvas.toDataURL();
  link.click();
});

document.getElementById("downloadPDF").addEventListener("click", () => {
  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "px",
    format: [canvas.width, canvas.height]
  });
  pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
  pdf.save("certificate.pdf");
});
