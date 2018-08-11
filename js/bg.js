
function set_bg() {
    let bg_canvas= document.createElement("canvas");
    bg_canvas.id= "bg_canvas";
    bg_canvas.width= window.innerWidth;
    bg_canvas.height= window.innerHeight;

    console.log("here");

    document.getElementById("body").prepend(bg_canvas);

    var triangle = new TriangleBG({
            canvas : document.getElementById("bg_canvas"),
            alternateElem : document.getElementById("bg_alt"),
            cellHeight : 90,
            cellWidth : 75,
            mouseLight : true,
            mouseLightRadius : 500,
            mouseLightIncrement : 50,
            resizeAdjustment : true,
            variance : 1.3,
            pattern : "x*y",
            baseColor1 : {
              baseHue : 120,
              baseSaturation : 60,
              baseLightness : 38
            },
            baseColor2 : {
              baseHue : 120,
              baseSaturation : 60,
              baseLightness : 40
            },
            colorDelta : {
              hue : 1,
              lightness : 0,
              saturation : 0
            }
        });
    return triangle;
}

window.addEventListener("load", set_bg, false);