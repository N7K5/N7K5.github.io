
class ScrollBar {

    constructor() {
        this.scroll_canvas= document.getElementById("scrollbar");
        this.ctx= this.scroll_canvas.getContext("2d");
        this.canvasWidth= "15";

        this.ctx.canvas.width= this.canvasWidth;
        this.ctx.canvas.height= window.innerHeight;
        this.s= new ScrollMath();


        // window.addEventListener("load", () => {
        //     this.ctx.canvas.width= this.canvasWidth;
        //     this.ctx.canvas.height= window.innerHeight;
        //     this.ctx.fillRect(0, 0, 20, window.innerHeight);
        // }, false);

        window.addEventListener("resize", () => {
            this.ctx.canvas.width= this.canvasWidth;
            this.ctx.canvas.height= window.innerHeight;
            this.show_scroll();
        }, false);

        window.addEventListener("scroll", () => {
            this.show_scroll();
        }, false);

        this.scroll_canvas.addEventListener("mousemove", () => {
        
        }, false);

        this.show_scroll();
    }

    draw_scroll_bar(y) {

        let bar_height= ~~(window.innerHeight*window.innerHeight/(document.documentElement.scrollHeight || document.body.scrollHeight));
        let pos_y= ~~(y* (window.innerHeight/ ((document.documentElement.scrollHeight || document.body.scrollHeight) - window.innerHeight)))
        
        this.ctx.clearRect(0, 0, this.canvasWidth, window.innerHeight);
        this.ctx.fillStyle= "rgba(0, 0, 0, 0.1)";
        this.ctx.fillRect(0, 0, this.canvasWidth, window.innerHeight);
        this.ctx.fillStyle= "rgba(255, 0, 0, 0.7)";
        this.ctx.fillRect(0, pos_y- bar_height/2, this.canvasWidth, bar_height);

    }

    show_scroll() {

        this.draw_scroll_bar(this.s.getScroll());

    }

}


window.addEventListener("load", () => {
    let scrollbar= new ScrollBar();
}, false);

class ScrollMath {

    constructor() {
        this.scrolling= false;
        this.scrollInterval= null;
        this.minJump= 20;
    }

    getScroll() {
        return document.documentElement.scrollTop || document.body.scrollTop || 0;
    }

    getOffsetOf(el) {
        let _y = 0;
        while( el && !isNaN( el.offsetTop ) ) {
            _y += el.offsetTop - el.scrollTop;
            el = el.offsetParent;
        }
        return _y;
    }

    scrollTo(scroll) {
        if(typeof scroll != "number" || this.scrolling) {
            return "Scrolling not possible";
        }

        let scrollHeight= (document.documentElement.scrollHeight || document.body.scrollHeight) - window.innerHeight;
        let dest= scroll<0? 0: (scroll>scrollHeight? scrollHeight:scroll);

        let jump= Math.floor((dest- this.getScroll()) / 15);

        if(jump== 0) {
            return;
        }
        this.scrolling= true;

        this.scrollInterval= setInterval(()=> {
            let cur= Math.abs(dest- this.getScroll());
            if(cur < Math.abs(jump) || cur < this.minJump) {
                clearInterval(this.scrollInterval);
                document.documentElement.scrollTop= dest;
                document.body.scrollTop= dest;
                this.scrolling= false;
                return;
            }
            document.documentElement.scrollTop+= jump;
            document.body.scrollTop+= jump;
        }, 33);

    }

}