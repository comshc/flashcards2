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
     
        this.items = [];

        this.list = document.createElement(ul);
        this.content.appendChild(list);
    }

    #render() {
        this.list.innerHTML = "";

        let par = this.content.parentElement
        this.content = document.createElement("ul");
        this.content.className = "menubar-items";
        this.items.forEach((p) => {
            let preview = document.createElement("li");
            preview.className = "menubar-item";
            preview.innerText = p.title;
            this.content.appendChild(preview)
        })
    }

    add(pane) {
        this.items.push(pane);

        this.#render();
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

m = new MenuBar();
p1 = new Pane("Pane 1")
p2 = new Pane("Pane 2")


a.has(
    b.setid("menubar-split").has(m),
    c.has(
        p1,
        p2
    )
).attach(document.body);
