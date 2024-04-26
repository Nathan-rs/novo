const body = $('body');

const fieldGroup = new FieldGroup({
   icon: 'menu',
   title: "Allinsys Test Boilerplatez",
   description: "Descrição passada pelo desenvolvedor",
})

const fildModalMaps = new FieldGroup({
   icon: "location",
   title: "Modal Google Maps",
   description: "Modal para obter latitude e longitude",
   open: true,
   collapse: false
})


const teste = new Modal({
   size: "large"
})

teste.show()


const modalMaps = new ModalMaps({
   title: "Modal de pesquisa",
   value: "-4.8653802&-46.633308"
})

fildModalMaps.appendToContent([modalMaps.getViewButtonModal(), modalMaps.getView()])
const contentList = [fildModalMaps.getView()]


fieldGroup.appendToContent(...contentList)
body.append(fieldGroup.getView()) 