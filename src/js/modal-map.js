class ModalMaps {
    constructor(config) {
        this.config = $.extend(true, {
            title: '[Sem título]',
            value: null
        }, config)

        this.address = null,
        this.latitude = null,
        this.longitude = null,
        this.marker = null,
        this.cardAddress = null,

        
        //Elementos HTML
        this.wrapper = new Div('wrapper')
        this.container = new Div('container')
        this.contentHeader = new Div('header-title')
        this.title = new H4('title')
        this.iconClose = new Icon('icon-close')
        this.content = new Div('content')
        this.areaClick = new Div('div-button')
        this.button = new Button('btn-ok')
        this.address = new Div('content-adress')
        this.divModal = new Div('div-modal')
        this.buttonModal = new Button('btn-open-modal')

        this.iconClose.addClass('close')

        this.setCoordinates(this.config.value)
        
        this.setAddress(this.getAddressLatitudeLongitude(this.getPositionLatitude(), this.getPositionLongitude()))

        this.wrapper.append(this.container)

        this.contentHeader.append(
            this.title,
            this.iconClose
        )

        this.areaClick.append(this.button)
        this.button.text(this.getTextButton())
        this.title.text(this.getTitle())

        this.container.append(
            this.contentHeader, 
            this.content, 
            this.areaClick
        )
        
        setTimeout(() => {
            this.wrapper.css('display', 'none')
        });

        //Eventos
        this.button.on('click', () => {
            console.log('Latitude: ', this.getPositionLatitude());
            console.log('Longitude: ', this.getPositionLongitude())
            console.log('Endereco: ', this.getAddress())
        })

        this.buttonModal.on('click', () => {
            this.openModal()
        })

        this.iconClose.on('click', () => {
            this.wrapper.css('display', 'none')
            this.divModal.css('display', 'flex')
        })
    }

    openModal() {
        this.wrapper.css('display', 'block')
        this.divModal.css('display', 'none')
        this.getInitMap()
    }

    getInitMap() {
        this.getCreateMap().then((map) => {
            if(!map) {
                this.getErrorMensage()
            }
            window.getCreateMap = this.getCreateMap
            this.setAddress()
        })
    }

    async getCreateMap() {
        try {
            const { Map } = await google.maps.importLibrary("maps")
            const { AdvancedMarkerElement, PinElement  } = await google.maps.importLibrary("marker")

            const map = new google.maps.Map(this.content[0], {
                center: {
                    lat: this.getPositionLatitude(),
                    lng: this.getPositionLongitude()
                },
                zoom: 12,
                mapId: "MAP_MODAL_ID",
                disableDefaultUI: true,
                zoomControl: true
            });

            this.createSearchBar(map)

            //Button custom location map
            const customButton = this.createButtonLocationUser(map)
            map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(customButton[0])


            //cria o marcador ping no mapa e seta por pasdrão a localização
            this.marker = new google.maps.marker.AdvancedMarkerElement({
                position: {
                    lat: this.getPositionLatitude(),
                    lng: this.getPositionLongitude()
                },
                map: map
            })
            
            map.addListener('click', async (event) => {

                const latitude = event.latLng.lat();
                const longitude = event.latLng.lng();

                this.setPositionLatitude(latitude)
                this.setPositionLongitude(longitude)

                if(this.marker) {
                    this.marker.setMap(null)
                }

                this.marker = new google.maps.Marker({
                    position: {
                        lat: this.getPositionLatitude(),
                        lng: this.getPositionLongitude()
                    },
                    map: map
                })

                map.setCenter({lat: this.getPositionLatitude(), lng: this.getPositionLongitude()})
                this.getInfoWindows(this.marker)
                this.createCardAddress(map, this.getPositionLatitude(), this.getPositionLongitude())
                this.setAddress()
            });
            return map
        } catch (error) {
            console.error('Erro ao criar o mapa', error)
            return null
        }
    }

    createButtonLocationUser(map) {
        const controlDiv = new Div('dv-geo-user')
        const geoLocationButton = new Button('btn-geo-user')
        const iconLocation = new Icon('location')

        iconLocation.addClass('icon-btn-geo-user')

        geoLocationButton.append(iconLocation)
        controlDiv.append(geoLocationButton)

        geoLocationButton.on('click', () => this.getUserLocation(map))
        return controlDiv
    }

    async createSearchBar(map) {
        const { Autocomplete } = await google.maps.importLibrary("places")
        const divSearch = new Div('dv-search')
        const inputSearch = new Input('input-search')
        const iconSearch = new Icon('search')
        const divContent = new Div('dv-content')

        const options = {
            fields: ['formatted_address', 'geometry'],
            types: ['geocode'],
            componentRestrictions: {country: 'BR'}
        }
        
        iconSearch.addClass('icon-search')
        inputSearch.attr('placeholder', 'Pesquise aqui')

        divContent.append(inputSearch, iconSearch)
        divSearch.append(divContent)

        const autocomplete = new google.maps.places.Autocomplete(inputSearch[0], options)

        autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace()

            if(!place.geometry || !place.geometry.location) {
                return
            }

            const location = place.geometry.location
            const latitude = location.lat()
            const longitude = location.lng()

            if(this.marker) {
                this.marker.setMap(null)
            }

            this.marker = new google.maps.Marker({
                position: {lat: latitude, lng: longitude},
                map: map
            })

            map.setCenter({
                lat: latitude,
                lng: longitude
            })

            this.setPositionLatitude(latitude)
            this.getPositionLongitude(longitude)
            this.setAddress()

            this.getInfoWindows(this.marker)
            console.log(place)
        })

        map.controls[google.maps.ControlPosition.TOP_CENTER].push(divSearch[0])
    }

    getUserLocation(map) {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }

                this.setPositionLatitude(userLocation.lat)
                this.setPositionLongitude(userLocation.lng)
                
                if(this.marker) {
                    this.marker.setMap(null)
                }
    
                this.marker = new google.maps.Marker({
                    position: userLocation,
                    map: map
                })
    
                map.setCenter(userLocation)
                this.setAddress()

                this.getInfoWindows(this.marker)

            })
        }
    }


    /**
     * @param {number} latLng latitude
     * @description adiciona o ping onde o usuario clicar 
     */
    placeMarkerAndPanTo(latLng, map) {
        new google.maps.marker.AdvancedMarkerElement({
            position: latLng,
            map: map,
        });
        map.panTo(latLng);
    }

    parseCoordinatesString(coordinateString) {
        const regexCoordinates = /^-?(90(\.0+)?|[1-8]?\d(\.\d+)?),\s*-?(180(\.0+)?|1[0-7]\d(\.\d+)?|\d{1,2}(\.\d+)?)$/

        if(regexCoordinates.test(coordinateString)) {
            const coordinates = coordinateString.trim().split('&')
            const latitude = parseFloat(coordinates[0])
            const longitude = parseFloat(coordinates[1])

            if(!isNaN(latitude) && !isNaN(longitude)) {
                return { latitude, longitude }
            }
        }
        return null
    }

    getInfoWindows(marker) {
        const infowindow = new google.maps.InfoWindow()

        marker.addListener("click", async () => {
            const address = await this.getAddressLatitudeLongitude(marker.getPosition().lat(), marker.getPosition().lng());
            infowindow.setContent(address);
            infowindow.open(marker.map, marker);
        })
    }

    async getAddressLatitudeLongitude(latitude, longitude) {
        try {
            const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDxMX7gWV7_iEffKz9TwPnKWGuVeNMyYJM`);
            const data = await response.json();
        
            if (data.results && data.results.length > 0) {
                return data.results[0].formatted_address;
            } else {
                return "Endereço não encontrado";
            }
        } catch (error) {
            console.error("Erro ao obter o endereço:", error);
            return "Erro ao obter o endereço";
        }
    }

    getViewButtonModal() {
        let text = new H2('txt-open-modal')
        
        text.text('Abrir modal')
        this.buttonModal.text('Open')

        this.divModal.append(
            this.buttonModal,
            text,
        )

        return this.divModal
    }

    async createCardAddress(map, latitude, longitude) {
        if(this.cardAddress) {
            this.cardAddress.remove()
        }

        this.cardAddress = new Div('dv-card')
        const divIcon = new Div('dv-icon-card')
        const divInfo = new Div('dv-info')
        const iLocation = new Icon('location')
        const iClose = new Icon('close')
        const elementCity = new Paragraph('title-card-city')
        const elementState = new Paragraph('title-card-state')
        const cityStateWrapper = new Div('dv-ct-stt')
        const wrapperCoordinates = new Div('dv-coordinates')
        const elementCoordinates = new Paragraph('title-coordinates')

        iLocation.addClass('i-card-location')
        iClose.addClass('i-card-close')

        divIcon.append(iLocation)
        cityStateWrapper.append(elementCity, elementState)
        wrapperCoordinates.append(elementCoordinates)
        divInfo.append(cityStateWrapper, wrapperCoordinates)

        // city.text('Caxias')
        // state.text('Maranhão')
        // coordinates.text('121212121212,'+' 1221212121')

        this.cardAddress.append(divIcon, divInfo, iClose)
        

        map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(this.cardAddress[0])

        const address = await this.getAddressLatitudeLongitude(latitude, longitude);
        const adressInfo = address.split(', ')

        elementCity.text(adressInfo[0])
        elementState.text(adressInfo[2])
        elementCoordinates.text(`${latitude}, ${longitude}`)
    }

    getAddress() {
        return this.address || "Endereço não encontrado"
    }

    async setAddress() {
        this.address = await this.getAddressLatitudeLongitude(this.getPositionLatitude(), this.getPositionLongitude());
    }

    getErrorMensage() {
        const titleErro = new H1('erro-show-map')
        titleErro.text("Não foi possivel exibir o mapa")
        this.content.append(titleErro)
        this.areaClick.css('display', 'none')
    }

    setCoordinates(coordinates) {
        const parseCoordinates = this.parseCoordinatesString(coordinates)

        if(coordinates && parseCoordinates) {
            this.setPositionLatitude(parseCoordinates.latitude)
            this.setPositionLongitude(parseCoordinates.longitude)
            return
        }

        this.setDefaultCoodinates()
    }

    setDefaultCoodinates() {
        this.setPositionLatitude(-23.55052)
        this.setPositionLongitude(-46.633308)
    }

    setPositionLatitude(latitude) {
        this.latitude = latitude
    }

    setPositionLongitude(longitude) {
        this.longitude = longitude
    }

    getPositionLatitude() {
        return this.latitude
    }

    getPositionLongitude() {
        return this.longitude
    }

    getTitle() {
        return this.config.title
    }

    getTextButton() {
        return "Confirmar"
    }

    getView() {
        return this.wrapper
    }
}