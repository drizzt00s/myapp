(function(){

    let winbox;

    window.examples = {

        "basic": function(){

            new WinBox("Basic Window");
        },
        "root": function(){

            new WinBox("Custom Root", {

                root: document.body
            });
        },
        "border": function(){

            new WinBox("Custom Border", {

                border: "0.3em"
            });
        },
        "color": function(){

            new WinBox({

                title: "Custom Color",
                background: "#ff005d",
                border: 4
            });
        },
        "viewport": function(){

            new WinBox("Limit Viewport", {

                top: 50,
                right: 50,
                bottom: 0,
                left: 50
            });
        },
        "splitscreen": function(){

            new WinBox("Splitscreen (Left)", {

                right: "50%",
                max: true
            });

            new WinBox("Splitscreen (Right)", {

                x: "100%",
                left: "50%",
                max: true
            });
        },
        "position": function(){

            new WinBox({

                title: "Custom Position / Size",
                x: "center",
                y: "center",
                width: "50%",
                height: "50%"
            });
        },
        "modal": function(){

            new WinBox("Modal Window", {

                modal: true
            });
        },
        "innerhtml": function(){

            new WinBox({

                title: "Set innerHTML",
                html: "<h1>Lorem Ipsum</h1>"
            });
        },
        "mount-clone": function(){

            new WinBox("Mount DOM", {

                mount: document.getElementById("content")
                               .cloneNode(true)
            });
        },
        "mount-auto": function(){

            new WinBox("Mount DOM", {

                mount: document.getElementById("content")
            });
        },
        "iframe": function(){

            new WinBox("WinBox.js", {

                url: "https://nextapps-de.github.io/winbox/",
                class: "iframe"
            });
        },
        "all-options": function(){

            new WinBox({

                id: "my-window",
                class: ["no-full", "my-theme"],
                root: document.body,
                title: "All Options",
                background: "#fff",
                border: 4,
                index: 50,
                width: 200,
                height: 200,
                minheight: 100,
                minwidth: 100,
                x: "center",
                y: "center",
                max: false,
                splitscreen: true,
                top: 50,
                right: 50,
                bottom: 0,
                left: 50,
                html: "width: 200, height: 200",
                onfocus: function(){
                    this.setBackground("#fff");
                },
                onblur: function(){
                    this.setBackground("#999");
                },
                onresize: function(width, height){
                    this.body.textContent = (
                        "width: " + width + ", " +
                        "height: " + height
                    );
                },
                onmove: function(x, y){
                    this.body.textContent = (
                        "x: " + x + ", " +
                        "y: " + y
                    );
                },
                onclose: function(force){
                    return !confirm("Close window?");
                }
            });
        },
        "custom-css": function(){

            new WinBox("Custom CSS", {

                class: "custom",
                mount: document.getElementById("content")
                               .cloneNode(true)
            });
        },
        "custom-class": function(){

            new WinBox("Custom CSS (Class)", {

                class: "my-theme",
                mount: document.getElementById("content")
                               .cloneNode(true)
            });
        },
        "theme-modern": function(){

            new WinBox("Yogel:", {

                class: "modern",
                mount: document.getElementById("content")
                               .cloneNode(true)
            });
        },
        "controls": function(){

            winbox = new WinBox("Controls", {

                mount: document.getElementById("controls"),
                border: 4,
                onclose: function(force){
                    return !force && !confirm("Close window?");
                }
            });
        }
    };

    window.buttons = {

        minimize: function(){

            winbox.minimize();
        },
        maximize: function(){

            winbox.maximize();
        },
        fullscreen: function(){

            winbox.fullscreen();
        },
        center: function(){

            winbox.move("center", "center");
        },
        move: function(){

            winbox.move("right", "bottom");
        },
        resize: function(){

            winbox.resize("50%", "50%");
        },
        title: function(){

            winbox.setTitle("Title-" + Math.random());
        },
        color: function(){

            winbox.setBackground(
                "rgb(" + (Math.random() * 255 | 0) + "," +
                         (Math.random() * 255 | 0) + "," +
                         (Math.random() * 255 | 0) + ")"
            );
        },
        modal: function(){

            winbox.body.parentNode.classList.toggle("modal");
        },
        add: function(){

            winbox.addClass("my-theme");
        },
        remove: function(){

            winbox.removeClass("my-theme");
        },
        close: function(){

            winbox.close();
        },
        force_close: function () {

            winbox.close(true);
        }
    };

}());

hljs.highlightAll();