class UIElement {
    constructor() {
        this.content = document.createElement("div");
    }

    attach(to) { return to.appendChild(this.content); }

    has() {
        for (
            let i = 0;
            i < arguments.length;
            arguments[i++].attach(this.content)
        ) {}
        return this;
    }

    setid(to) {
        this.content.id = to;
        return this;
    }

    destroy() {
        this.content.parentElement.removeChild(this.content);
        return this;
    }
}

class Split extends UIElement {
    static HORZ = 0;
    static VERT = 1;

    constructor(direction) {
        super();
        this.direction = direction;

        this.content.className =
            this.direction === Split.HORZ ?
                "hsplit" :
                "vsplit";
    }
}

class Pane extends UIElement {
    constructor(title = null, closeBtn = true) {
        super();
        this.title = title;

        if (this.title !== null) {
            let title_el = document.createElement("span");
            title_el.innerText = this.title;
            title_el.className = "pane-title";
            this.content.appendChild(title_el);
        }

        this.content.classList.add("pane");

        if (closeBtn) {
            let close = new CloseBtn()

            close.content
                .addEventListener("click", (e) => {
                    this.destroy();
                });

            this.has(close);
        }
    }
}

class MenuBar extends Pane {
    constructor() {
        super(null, false);

        for (let i = 0; i < arguments.length; i++) {
            this.add(arguments[i]);
        }
    }

    add(item) {
        item.attach(this.content);
    }
}

class MenuItem extends UIElement {
    constructor(name, color, concealed) {
        super();
        this.name = name;
        this.color = color;
        this.concealed = concealed;

        this.content = document.createElement("button");
        this.content.classList.add("menu-item");
        this.content.style.backgroundColor = this.color;
        this.content.style.outlineColor = this.color;

        let title = document.createElement("span");
        title.className = "menu-item-title";
        title.innerText = this.name;


        this.content.appendChild(title);
       
        this.content.addEventListener("click", () => {
            add_pane(this.concealed);
        })
    }
}

class CloseBtn extends UIElement {
    constructor() {
        super();
        this.content = document.createElement("button");

        this.content.classList.add("close-btn");
    }
}

a = new Split(Split.VERT);
b = new Split(Split.HORZ);
c = new Split(Split.HORZ);

m = new MenuBar(
    new MenuItem("Test 1", "#8ec07c", new Pane("Test 1")),
    new MenuItem("Verylongname", "#fabd2f", new Pane("Verylongname")),
    new MenuItem("Test 3", "#d3869b", new Pane("Test 3"))
);

p1 = new Pane("Pane 1")
p2 = new Pane("Pane 2")

function add_pane(pane) {
    c.has(pane);
}

a.has(
    b.setid("menubar-split").has(m),
    c.has(
        p1,
        p2
    )
).attach(document.body);
