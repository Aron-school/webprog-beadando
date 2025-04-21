document.addEventListener("DOMContentLoaded", () => {
    // Web Storage
    const storageDiv = document.getElementById("web-storage");
    storageDiv.innerHTML = `<h3>Web Storage</h3>
      <input id="nameInput" placeholder="Add meg a neved" />
      <button id="saveName">Mentés</button>
      <p id="savedName">Elmentett név: ${localStorage.getItem("name") || "Nincs"}</p>`;
  
    document.getElementById("saveName").onclick = () => {
      const name = document.getElementById("nameInput").value;
      localStorage.setItem("name", name);
      document.getElementById("savedName").textContent = `Elmentett név: ${name}`;
    };
  
    // Web Worker (csak ha támogatott)
    const workerDiv = document.getElementById("web-worker");
    workerDiv.innerHTML = `<h3>Web Worker</h3>
      <button id="startWorker">Számolás elindítása (1-1e7)</button>
      <p id="workerResult"></p>`;
  
    let worker;
    document.getElementById("startWorker").onclick = () => {
      if (window.Worker) {
        worker = new Worker(URL.createObjectURL(new Blob([`
          self.onmessage = function() {
            let sum = 0;
            for (let i = 1; i <= 1e7; i++) sum += i;
            postMessage(sum);
          };
        `])));
        worker.onmessage = e => {
          document.getElementById("workerResult").textContent = `Összeg: ${e.data}`;
        };
        worker.postMessage("start");
      }
    };
  
    // Server-Sent Events (mockolva setInterval-lel)
    const sseDiv = document.getElementById("sse");
    sseDiv.innerHTML = `<h3>Server-Sent Events (Mock)</h3>
      <p id="sseTime"></p>`;
    setInterval(() => {
      document.getElementById("sseTime").textContent = `Idő: ${new Date().toLocaleTimeString()}`;
    }, 1000);
  
    // Geolocation API
    const geoDiv = document.getElementById("geolocation");
    geoDiv.innerHTML = `<h3>Geolocation API</h3>
      <button id="getLocation">Hely meghatározása</button>
      <p id="locationInfo"></p>`;
    document.getElementById("getLocation").onclick = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
          const { latitude, longitude } = pos.coords;
          document.getElementById("locationInfo").textContent = `Koordináták: ${latitude}, ${longitude}`;
        }, () => {
          document.getElementById("locationInfo").textContent = "Hozzáférés megtagadva vagy hiba.";
        });
      }
    };
  
    // Drag and Drop API
    const dragDiv = document.getElementById("dragdrop");
    dragDiv.innerHTML = `<h3>Drag and Drop API</h3>
      <div id="dragbox" draggable="true" style="width:100px;height:100px;background:red;"></div>
      <div id="dropzone" style="width:120px;height:120px;border:2px dashed #000;margin-top:10px;">Dobd ide</div>`;
    
    const dragbox = document.getElementById("dragbox");
    const dropzone = document.getElementById("dropzone");
  
    dragbox.addEventListener("dragstart", e => e.dataTransfer.setData("text", "dragbox"));
    dropzone.addEventListener("dragover", e => e.preventDefault());
    dropzone.addEventListener("drop", e => {
      e.preventDefault();
      dropzone.appendChild(dragbox);
    });
  
    // Canvas API
    const canvasDiv = document.getElementById("canvas");
    canvasDiv.innerHTML = `<h3>Canvas</h3><canvas id="myCanvas" width="100" height="100"></canvas>`;
    const ctx = document.getElementById("myCanvas").getContext("2d");
    ctx.fillStyle = "blue";
    ctx.fillRect(10, 10, 80, 80);
  
    // SVG
    const svgDiv = document.getElementById("svg");
    svgDiv.innerHTML = `<h3>SVG</h3>
      <svg width="100" height="100">
        <circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />
      </svg>`;
  });