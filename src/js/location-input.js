class LocationInput{
    constructor(config){

        this.config = $.extend(true, {

            title: '',
            subtitle: '',
            size: 'medium',
            modal: {},
            modalMaps: {},
            value: ''


        }, config)

        this.input = new Input()

        this.locationPicker = new LocationPicker({
            ...this.config.modalMaps,
            title: this.config.title,
            subtitle: this.config.subtitle,
            onConfirm: (data) => this.input.val(data.latitude + data.longitude)

        })

    }
}