const TotalSizeMb = 100;
var files = [];

function handleFileSelection(event) {
    const fileList = event.target.files;
    for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        const allowedExtensions = ['.jpg', '.jpeg', '.gif', '.png'];

        if (!allowedExtensions.some(ext => file.name.toLowerCase().endsWith(ext))) {
            alert("Error: File format is not supported.");
            console.error('Error: File format is not supported.');
            continue; 
        }
        
        if (checkFileSize(file)) {
            files.push(file);
            if(fileSizeCalculator(file)<0){
                alert("Error: Files size is too large. Max size is 100MB.");
                console.error('Error: Files size is too large. Max size is 100MB.');
                files.pop();
                return 0;
            }
            displayFile(file);
        }
    }
}

function chooseFile() {
    console.log('chooseFile');
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '';
    fileInput.addEventListener('change', handleFileSelection);
    fileInput.click();
}

function checkFileSize(file) {
    console.log("check total size");
    const fileSizeInMbs = Math.ceil(file.size / (1024 ** 2));
    
    console.log('File size:', fileSizeInMbs + ' Mb');
    if (fileSizeInMbs > TotalSizeMb) {
        alert("Error: File size is too large. Max size is 100MB.");
        console.error('Error: File size is too large. Max size is 100MB.');
        return false;
    }
    return true;
}

function fileSizeCalculator(file) {
    if(checkFileSize(file)){
        const totalUsedSpaceMb = Math.ceil(files.reduce((acc, curr) => acc + curr.size / (1024 ** 2), 0));
        const MbLeft = TotalSizeMb - totalUsedSpaceMb;
        console.log('MbLeft:', MbLeft);
        const StorageUsed = document.getElementById('StorageUsed');
        const BottomStorageUsed = document.getElementById('BottomStorageUsed');
        StorageUsed.innerHTML = 100-MbLeft;
        BottomStorageUsed.innerHTML =  100-MbLeft;
        document.querySelector('.gradient-bar').style.width = StorageUsed.innerHTML+'%';
        const StorageLeft = document.getElementById('StorageLeft');
        StorageLeft.innerHTML = MbLeft;
        return MbLeft;
    }
    else {
        return 0;
    }
}


function displayFile(file) {
    const fileList = document.getElementById('fileList');
    const listItem = document.createElement('li');
    listItem.innerHTML = `${file.name} <button class="deleteButton" onclick="deleteFile('${file.name}')">x</button>`;
    fileList.appendChild(listItem);
}

function deleteFile(fileName) {
    files = files.filter(file => file.name !== fileName);
    const fileList = document.getElementById('fileList');
    fileList.innerHTML = ''; 
    files.forEach(file => displayFile(file));
}



