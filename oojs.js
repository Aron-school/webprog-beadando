class HTMLElementWrapper {
    constructor(tagName, className = "") {
      this.element = document.createElement(tagName);
      if (className) this.element.className = className;
    }
  
    appendTo(parent) {
      parent.appendChild(this.element);
    }
  
    on(event, callback) {
      this.element.addEventListener(event, callback);
    }
  }
  
  class Note extends HTMLElementWrapper {
    constructor(text) {
      super("div", "note");
      this.text = text;
      this.render();
    }
  
    render() {
      this.element.innerHTML = `
        <p>${this.text}</p>
        <button class="delete-btn">Törlés</button>
      `;
  
      this.element.querySelector(".delete-btn").addEventListener("click", () => {
        this.element.remove();
      });
    }
  }
  
  class NoteApp {
    constructor(containerSelector) {
      this.container = document.querySelector(containerSelector);
      this.notes = [];
  
      this.renderInput();
      this.renderListContainer();
    }
  
    renderInput() {
      this.input = new HTMLElementWrapper("input");
      this.input.element.type = "text";
      this.input.element.placeholder = "Írj be egy jegyzetet...";
  
      this.button = new HTMLElementWrapper("button");
      this.button.element.textContent = "Hozzáadás";
  
      this.button.on("click", () => this.addNote());
  
      this.container.appendChild(this.input.element);
      this.container.appendChild(this.button.element);
    }
  
    renderListContainer() {
      this.noteList = new HTMLElementWrapper("div", "note-list");
      this.container.appendChild(this.noteList.element);
    }
  
    addNote() {
      const text = this.input.element.value.trim();
      if (!text) return;
  
      const note = new Note(text);
      this.notes.push(note);
      note.appendTo(this.noteList.element);
  
      this.input.element.value = "";
    }
  }
  
  // App elindítása
  document.addEventListener("DOMContentLoaded", () => {
    new NoteApp(".content-div");
  });
  