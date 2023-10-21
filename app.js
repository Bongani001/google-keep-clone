class Note {
    constructor(id, title, text) {
      this.id = id;
      this.title = title;
      this.text = text;
    }
  }
  
  class App {
    constructor() {
      this.notes = [new Note(1, "cool", "cool")];

      this.$activeForm = document.querySelector(".active-form");
      this.$inactiveForm = document.querySelector(".inactive-form");
      this.$noteTitle = document.querySelector("#note-title");
      this.$noteText = document.querySelector("#note-text");
      this.$notes = document.querySelector(".notes");
      this.$form = document.querySelector("#form");
      
      this.addEventListeners();
      this.displayNotes();
    }

    addEventListeners() {
        document.body.addEventListener("click", (event) => {
            this.handleFormClick(event);
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
    }
  
      displayNotes() {
        this.$notes.innerHTML = this.notes.map((note) => 
            `
            <div class="note" id="${note.id}">
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
  