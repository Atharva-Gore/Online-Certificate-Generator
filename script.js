const form = document.getElementById("certForm");
const canvas = document.getElementById("certificateCanvas");
const ctx = canvas.getContext("2d");
const templateSelect = document.getElementById("templateSelect");

const positions = {
  "template1.png": { nameY: 360, courseY: 420, dateY: 500 },
  "template2.png": { nameY: 340, courseY: 410, dateY: 480 }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const course = document.getElementById("course").value;
  const date = document.getElementById("date").value;
  const selectedTemplate = templateSelect.value;

  const bg = new Image();
  bg.src = `templates/${selectedTemplate}`;

  bg.onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

    const pos = positions[selectedTemplate] || positions["template1.png"];

    ctx.font = "40px 'Poppins', sans-serif";
    ctx.fillStyle = "#000";
    ctx.textAlign = "center";

    ctx.fillText(name, canvas.width / 2, pos.nameY);
    ctx.font = "28px 'Poppins', sans-serif";
    ctx.fillText(`for completing ${course}`, canvas.width / 2, pos.courseY);
    ctx.fillText(`Date: ${date}`, canvas.width / 2, pos.dateY);
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
