// Main entry point for webpack development bundle

// Enable hot reloading for current module
if (module.hot) {
  module.hot.accept()
}

// This should always be true at this point
if (process.env.NODE_ENV === 'development') {
    console.log("REEU DEVELOPMENT")

    // Debugs css layout
    var debugLayout = () => {
        let A = ''
        for(let i=0;A=$$("*")[i++];)A.style.outline="solid hsl("+(A+A).length*9+",99%,50%)1px";
    }
    window.debugLayout = debugLayout;
}

// import page bundles
import '@/bundles/app.js'
import '@/bundles/error.js'
