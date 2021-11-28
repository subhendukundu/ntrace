if (typeof window !== 'undefined') {
  window.productHuntUpcoming = {
    appId: 116175,
    position: 'bottomLeft'
  };

  (function (doc, scr, src, a, b) {
    a = doc.createElement(scr)
    b = doc.getElementsByTagName(scr)[0]
    a.async = true
    a.src = src
    b.parentNode.insertBefore(a, b)
  })(
    document,
    'script',
    'https://assets.producthunt.com/assets/upwigloader.js'
  )
}
