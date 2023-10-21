class Note {
    constructor(id, title, text) {
      this.id = id;
      this.title = title;
      this.text = text;
    }
  }
  
  class App {
    constructor() {
      this.notes = [new Note("boy", "cool", "cool")];
      this.selectedNoteId = "";

      this.$activeForm = document.querySelector(".active-form");
      this.$inactiveForm = document.querySelector(".inactive-form");
      this.$noteTitle = document.querySelector("#note-title");
      this.$noteText = document.querySelector("#note-text");
      this.$notes = document.querySelector(".notes");
      this.$form = document.querySelector("#form");
      this.$modal = document.querySelector(".modal");
      this.$modalForm = document.querySelector("#modal-form");
      this.$modalTitle = document.querySelector("#modal-title");
      this.$modalText = document.querySelector("#modal-text");
      
      this.addEventListeners();
      this.displayNotes();
    }

    addEventListeners() {
        document.body.addEventListener("click", (event) => {
            this.handleFormClick(event);
            this.closeModal(event);
            this.openModal(event);
        })

        this.$form.addEventListener("submit", (event) => {
            event.preventDefault();
            const title = this.$noteTitle.value;
            const text = this.$noteText.value;
            this.closeActiveForm();
            this.addNote({title, text});
        })
    }

    handleFormClick(event) {
        const isActiveFormClicked = this.$activeForm.contains(event.target);
        const isInactiveFormClicked = this.$inactiveForm.contains(event.target);
        const title = this.$noteTitle.value;
        const text = this.$noteText.value;

        if(isInactiveFormClicked) {
            this.openActiveForm();
        } else if (!isInactiveFormClicked && !isActiveFormClicked) {
            this.closeActiveForm();
            this.addNote({title, text});
        }
    }

    openActiveForm() {
        this.$activeForm.style.display = "block";
        this.$inactiveForm.style.display = "none";
        this.$noteText.focus();
    }

    closeActiveForm() {
        this.$activeForm.style.display = "none";
        this.$inactiveForm.style.display = "block";
        this.$noteTitle.value = "";
        this.$noteText.value = "";
    }

    openModal(event) {
        const $selectedNote = event.target.closest(".note");
        this.selectedNoteId = $selectedNote.id;
        if($selectedNote) {
            this.selectedNoteId = $selectedNote.id;
            this.$modalTitle.value = $selectedNote.children[1].innerText;
            this.$modalText.value = $selectedNote.children[2].innerText;
            this.$modal.classList.add("open-modal");
        }
    }

    closeModal(event) {
        const isModalFormClicked = this.$modalForm.contains(event.target);
        if(!isModalFormClicked && this.$modal.classList.contains("open-modal")) {
            this.editNote(this.selectedNoteId, {title: this.$modalTitle.value, text: this.$modalText.value});
            this.$modal.classList.remove("open-modal");
        };
    }
  
    addNote({ title, text }) {
        if(text != "") {
            const newNote = new Note(cuid(), title, text);
            this.notes = [...this.notes, newNote];
            this.displayNotes();
        }
    }
  
    editNote(id, { title, text }) {
      this.notes = this.notes.map((note) => {
        if (note.id == id) {
          note.title = title;
          note.text = text;
        }
        return note;
      });
      this.displayNotes();
    }

    handleMouseOverNote(element) {
        const $note = document.querySelector("#" + element.id);
        const $checkNote = $note.querySelector(".check-circle");
        const $noteFooter = $note.querySelector(".note-footer");
        $checkNote.style.visibility = "visible";
        $noteFooter.style.visibility = "visible";
    }

    handleMouseOutNote(element) {
        const $note = document.querySelector("#" + element.id);
        const $checkNote = $note.querySelector(".check-circle");
        const $noteFooter = $note.querySelector(".note-footer");
        $checkNote.style.visibility = "hidden";
        $noteFooter.style.visibility = "hidden";
    }
  
      displayNotes() {
        this.$notes.innerHTML = this.notes.map((note) => 
            `
            <div class="note" id="${note.id}" onmouseover="app.handleMouseOverNote(this)" onmouseout="app.handleMouseOutNote(this)">
                <span class="material-icons check-circle">check_circle</span>
                <span class="title">
                    ${note.title}
                </span>
                <span class="text">
                    ${note.text} 
                </span>
                <div class="note-footer">
                    <div class="tooltip">
                        <span class="material-icons-outlined hover small-icon">add_alert</span>
                        <span class="tooltip-text">Remind me</span>
                    </div>
                    <div class="tooltip">
                        <span class="material-icons-outlined hover small-icon">person_add</span>
                        <span class="tooltip-text">Collaborator</span>
                    </div>
                    <div class="tooltip">
                        <span class="material-icons-outlined hover small-icon">palette</span>
                        <span class="tooltip-text">Background options</span>
                    </div>
                    <div class="tooltip">
                        <span class="material-icons-outlined hover small-icon">image</span>
                        <span class="tooltip-text">Add image</span>
                    </div>
                    <div class="tooltip">
                        <span class="material-icons-outlined hover small-icon">archive</span>
                        <span class="tooltip-text">Archive</span>
                    </div>
                    <div class="tooltip">
                        <span class="material-icons-outlined hover small-icon">more_vert</span>
                        <span class="tooltip-text">More</span>
                    </div>
                </div>
            </div>
            `
          ).join("");
      };
    
  
    deleteNote(id) {
        this.notes = this.notes.filter(note => note.id != id)
    }
  }
  
  const app = new App();
  