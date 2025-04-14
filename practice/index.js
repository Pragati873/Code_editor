const button = document.getElementById("export");
const textArea = document.getElementsByTagName("textarea")[0];

button.addEventListener("click", () => {
    console.log(textArea.value);

    // Create a Blob object with the textarea content
    const blob = new Blob([textArea.value], { type: 'text/plain' });

    // Create a temporary URL for the Blob
    const url = URL.createObjectURL(blob);
    console.log(url); // Should log something like blob:http://...

    // Create a downloadable link
    const link = document.createElement("a");
    link.href = url;
    link.download = "myfile.txt";

    // Add the link to the DOM
    document.body.appendChild(link);

    // Trigger the download
    link.click();

    // Remove the link after triggering download
    document.body.removeChild(link);
});
