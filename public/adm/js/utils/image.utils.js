// Funções utilitárias para manipulação de imagens

export function createImagePreview(file, onRemove, index) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        
        reader.onload = (e) => {
            const wrapper = document.createElement("div");
            wrapper.classList.add("preview-wrapper");
            
            const img = document.createElement("img");
            img.src = e.target.result;
            
            const removeBtn = document.createElement("div");
            removeBtn.classList.add("remove-btn");
            removeBtn.innerHTML = "×";
            removeBtn.onclick = () => onRemove(index);
            
            wrapper.appendChild(img);
            wrapper.appendChild(removeBtn);
            
            resolve(wrapper);
        };
        
        reader.readAsDataURL(file);
    });
}

export function createExistingImagePreview(imgObj, onRemove, index) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("preview-wrapper");
    
    wrapper.innerHTML = `
        <img src="${imgObj.url}" alt="Imagem ${index + 1}">
        <div class="remove-btn" onclick="removeExistingImage(${index})">×</div>
    `;
    
    return wrapper;
}

export function validateImageCount(files, requiredCount) {
    return files.length === requiredCount;
}

export function clearPreviewArea(previewAreaId) {
    const previewArea = document.getElementById(previewAreaId);
    if (previewArea) {
        previewArea.innerHTML = "";
    }
}