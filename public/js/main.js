const form = document.getElementById("uploadForm");

const sendFile = async () => {
	const myFiles = document.getElementById("myFiles").files;

	const formData = new FormData();

	Object.values(myFiles).forEach((file) => {
		formData.append(file.name, file);
	});

	const response = await fetch("http://localhost:3000/upload", {
		method: "POST",
		body: formData,
	});

	const data = await response.json();
	const h2 = document.querySelector("h2");
	h2.textContent = `Status: ${data?.status}`;

	const h3 = document.querySelector("h3");
	h3.textContent = `${data?.message}`;

	console.log(data);
};

form.addEventListener("submit", (e) => {
	e.preventDefault();
	sendFile();
});
