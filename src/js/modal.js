/**
 * Classe para uso de modais
 * @author Rodrigo Hoffmann
 * @param object config
 */
class Modal {
   constructor(config) {
      let self = this

      // Configuração padrão da classe
      this.config = {
         type: WIDGET_MODAL,
         target: "body",
         title: "Ops!",
         subtitle: '',
         content: "Deseja continuar?",
         size: "xsmall",
         responsive: false,
         style: "default",
         theme: "default",
         zIndex: 2900,
         minHeight: null,
         animation: "rise",
         lineColor: COLORS.GREY,
         icon: "ic warning",
         closeIcon: true,
         isLoading: false,
         loader: false,
         backgroundDismiss: false,
         backgroundImage: undefined,
         line: false,
         align: {
            vertical: "center",
            horizontal: "center",
         },
         buttons: {
            action: true,
            cancel: true,
            align: "right",
            cancelButton: {
               label: "Fechar",
               class: "btn-cl",
            },
            actionButtons: [],
         },
         build: {
            divider: false,
            header: true,
            footer: true,
            content: {
               padding: true,
            },
         }
      }

      // Sobreescreve a configuração da classe
      if (config) {
         this.config = $.extend(true, this.config, config)
      }

      // Cria os elementos do modal
      this.container = new Div("md-bg hd")
      this.modalAlign = new Div("md-al")
      this.modalColumn = new Div("")
      this.modalPanel = new Div("md-pn")

      this.modalHeading = new Div("md-hd")
      this.modalHeadingIcon = new Icon("md-hd-i")
      this.modalHeadingContainer = new Div("md-hd-ct")
      this.modalHeadingRow = new Div("md-hd-row")
      this.modalHeadingContent = new Div("md-hd-c")
      this.modalHeadingSubTitle = new Div("md-hd-st")
      this.modalHeadingTools = new Div("md-hd-tl")
      this.modalContent = new Div("md-ct")
      this.modalFooter = new Div("md-ft")
      this.modalFooterContainer = new Div("md-ft-ct")
      this.modalFooterRow = new Div("md-ft-row")
      this.modalFooterContent = new Div("md-ft-c")

      // Configura o z-index do Modal
      this.container.css("z-index", this.config.zIndex)

      // Configura os elementos
      if (this.config.backgroundImage) {
         this.container.css({
            backgroundImage: "url(" + this.config.backgroundImage + ")",
         })
      }

      this.modalPanel.css("min-height", this.config.minHeight || 0)
      if (this.config.buttons?.cancelButton.position) {
         this.modalFooterRow.css("position", this.config.buttons.cancelButton.position)
      }


      // Carrega o loader se passado como parametro
      this.loaderContainer = new Div("col-auto pt-5 pb-4")
      this.loaderGrid = new Div("col-12 tx-c")
      this.loader = new Div("ld")

      if (this.config.loader) {
         this.loaderGrid.append(this.loader)
         this.loaderContainer.append(this.loaderGrid)
         this.modalPanel.append(this.loaderContainer)
      }

      this.container.addClass(this.config.animation)

      switch (this.config.theme) {
         case "primary":
            this.container.addClass("md-pm")
            break
         case "accent":
            this.container.addClass("md-ac")
            break
         case "info":
            this.container.addClass("md-if")
            break
         case "warning":
            this.container.addClass("md-wn")
            break
         case "success":
            this.container.addClass("md-sc")
            break
         case "danger":
            this.container.addClass("md-dg")
            break
         default:
            break
      }

      // Adiciona a linha superior ao modal
      if (this.config.line) {
         this.modalPanel.addClass('md-pn-ln');
         this.modalPanel.css('--line-color', this.config.lineColor);
      }

      this.modalHeadingSubTitle.html(this.config.subtitle)
      this.modalHeadingContent.html(this.config.title)

      if (this.config.subtitle) {
         this.modalHeadingContent.append(this.modalHeadingSubTitle)
      }

      this.modalContent.html(this.config.content)

      if (this.config.closeIcon) {
         this.closeIcon = this.config.closeIconType ? new Icon("md-close ic close " + this.config.closeIconType) : new Icon("md-close ic close")

         this.modalPanel.append(this.closeIcon)
         this.closeIcon.click(function () {
            if (self.onCloseIconClick) self.onCloseIconClick()
            self.close()
         })
      }

      if (this.config.backgroundDismiss) {
         $(document).mouseup(function (e) {
            if (!self.modalPanel.is(e.target) && self.modalPanel.has(e.target).length === 0) {
               self.close()
            }
         })
      }

      switch (this.config.align.horizontal) {
         case "center":
            this.modalAlign.addClass("jf-ct-c")
            break
         case "left":
            this.modalAlign.addClass("jf-ct-s")
            break
         case "right":
            this.modalAlign.addClass("jf-ct-e")
            break
         default:
            this.modalAlign.addClass("jf-ct-c")
            break
      }

      // TODO: problema no scroll:  Remover classe al-it-c na versão mobile
      switch (this.config.align.vertical) {
         case "center":
            this.modalAlign.addClass("al-it-c")
            break
         case "top":
            this.modalAlign.addClass("al-it-t")
            break
         case "bottom":
            this.modalAlign.addClass("al-it-e")
            break
         default:
            this.modalAlign.addClass("al-it-c")
            break
      }

      this.setSize(this.config.size)

      switch (this.config.style) {
         case "alert":
         case "fullscreen":
            this.modalFooterRow.addClass("jf-ct-c")
            break
         default:
            switch (this.config.buttons.align) {
               case "center":
                  this.modalFooterRow.addClass("jf-ct-c")
                  break
               case "left":
                  this.modalFooterRow.addClass("jf-ct-s")
                  break
               case "right":
                  this.modalFooterRow.addClass("jf-ct-e")
                  break
               default:
                  this.modalFooterRow.addClass("jf-ct-e")
                  break
            }
            break
      }

      switch (this.config.style) {
         case "alert":
            this.container.addClass("alert")
            this.modalHeadingIcon.addClass(this.config.icon)
            this.modalHeadingRow.prepend(this.modalHeadingIcon)
            // this.modalColumn.css({ maxWidth: this.config.maxWidth ? this.config.maxWidth : 350 + 'px' });
            break
         case "fullscreen":
            this.modalHeadingIcon.addClass(this.config.icon)
            this.modalHeadingContent.prepend(this.modalHeadingIcon)
            this.container.addClass("fullscreen")
            break
         case "report":
            this.container.addClass("report")
         case "editor":
            this.container.addClass("editor scroll-bar")
            break
      }

      if (this.config.buttons.cancel) {
         this.cancelButton = new Button(this.config.buttons.cancelButton.class)
         this.cancelButton.addClass('btn')
         this.cancelButton.attr('type', 'button')
         this.cancelButton.html(this.config.buttons.cancelButton.label)
         this.modalFooterContent.append(this.cancelButton)
         this.cancelButton.click(function () {
            self.close()
         })
      }

      if (this.config.buttons.action) {
         if (this.config.buttons.actionButtons.length > 0) {
            for (var i in this.config.buttons.actionButtons) {
               var buttonConfig = this.config.buttons.actionButtons[i]

               this.setButton(buttonConfig)
            }
         }
      }

      // Constroi o layout
      this.modalHeadingRow.append(this.modalHeadingContent)
      // this.modalHeadingRow.append(this.modalHeadingTools);
      this.modalHeadingContainer.append(this.modalHeadingRow)
      this.modalHeading.append(this.modalHeadingContainer)

      this.modalFooterRow.append(this.modalFooterContent)
      this.modalFooterContainer.append(this.modalFooterRow)
      this.modalFooter.append(this.modalFooterContainer)

      if (this.config.build.header) {
         if (this.config.build.header !== "false") {
            this.modalPanel.append(this.modalHeading)
         }
      }

      this.modalPanel.append(this.modalContent)

      if (!this.config.build.content.padding) {
         this.modalContent.addClass("no-pd")
      }

      if (this.config.build.footer) {
         if (this.config.build.footer !== "false") {
            this.modalPanel.append(this.modalFooter)
         }
      }

      if (!this.config.build.divider || this.config.build.divider == "false") {
         this.modalHeading.addClass("no-dv")
         this.modalFooter.addClass("no-dv")
      }

      this.modalColumn.append(this.modalPanel)
      this.modalAlign.append(this.modalColumn)
      this.container.append(this.modalAlign)

      // $(document).keyup(function (e) {
      //     if (e.keyCode === 27) {
      //         // 'ESC';
      //         // $('body').find('.md-bg').length;
      //         // TODO: close on esc
      //     }
      // });
   }

   /**
    * Define a largura do modal
    * @param string size
    */
   setSize(size) {
      // Reseta a classe da coluna
      this.modalColumn.removeClass()


      if (this.config.maxWidth) {
         this.modalColumn.addClass("col")
         this.modalColumn.css({ maxWidth: this.config.maxWidth + "px" })
      } else {
         // switch (this.config.style) {
         //     case 'alert':
         //         this.modalColumn.addClass('col');
         //         break;
         //     default:


         switch (size) {
            case "xsmall":
               this.modalColumn.addClass("col-auto")
               break
            case "small":
               this.modalColumn.addClass("col-sm-5 col-md-4 col-lg-3")

               this.modalFooterContent.addClass('jf-ct-c row mt-1')
               break
            case "medium":
               this.modalColumn.addClass("col-sm-8 col-md-7 col-lg-6")
               break
            case "large":
               this.modalColumn.addClass("col-sm-10 col-md-9 col-lg-8")
               break
            case "xlarge":
               this.modalColumn.addClass("col-sm-12 col-md-11 col-lg-10")
               break
            case "full":
               this.modalColumn.addClass("col-12")
               break
            case "fullscreen":
               this.modalColumn.addClass("fw")
               this.modalPanel.removeClass("md-pn")
               break
            case "auto":
               this.modalColumn.addClass("col-auto")
               break
            default:
               this.modalColumn.addClass(`${size}`)
               // this.modalColumn.addClass('col-sm-8 col-md-7 col-lg-6');
               break
         }
         // break;
         // }
      }
   }


   /**
    * Define se o modal está carregando conteúdo ou executando alguma ação
    * @param bool isLoading
    */
   setLoading(isLoading) {
      let self = this

      setTimeout(function () {
         self.config.isLoading = isLoading
      }, TIME_SLOW)
   }

   /**
    * Adiciona um botão ao formulário
    * @param object buttonConfig
    */
   setButton(buttonConfig) {
      self = this
      let button

      if (buttonConfig.class) {
         button = new Button(buttonConfig.class)
      } else {
         button = new Button("btn-ac")
      }

      button.html(buttonConfig.label)
      button.addClass('btn')
      button.attr('type', 'button')

      button.click(function () {
         if (buttonConfig.function) {
            buttonConfig.function.call(this, buttonConfig.params)
         }
      })

      if (buttonConfig.key) {
         $(document).on("keypress", function (event) {
            if (event.which == buttonConfig.key) {
               if (buttonConfig.block) {
                  if (!self.config.isLoading) {
                     self.config.isLoading = true
                     button.click()
                  }
               } else {
                  button.click()
               }
            }
         })
      }

      this.modalFooterContent.append(button)
   }

   /**
    * Altera conteúdo do modal
    * @param object view
    */
   setContent(view) {
      let self = this

      this.modalContent.html("")
      this.modalContent.append(view)

      // Resolve o bug do scroll do modal
      setTimeout(function () {
         if (self.container.height() < self.modalPanel.height()) {
            self.modalAlign.removeClass("al-it-c")
         }
      }, TIME_DEFAULT)
   }

   /**
    * Altera conteúdo do modal
    * @param object view
    */
   setHeader(view) {
      this.modalHeadingRow.html("")
      this.modalHeadingRow.append(view)
   }

   appendToHeaderContent(view){
      this.modalHeadingContent.append(view)
   }

   /**
    * Altera o titulo
    * @param string title
    */
   setTitle(title) {
      this.modalHeadingContent.html(title)
   }

   /**
    * Define o elemento pai do modal
    */
   setTarget(target) {
      this.config.target = target
   }

   // Remove o rodapé
   removeFooter() {
      this.modalFooter.remove()
   }

   // Animação negativa do modal
   shake() {
      let self = this

      this.container.addClass("shake")
      setTimeout(function () {
         self.container.removeClass("shake")
      }, TIME_SLOW)

      var audio = new Audio(DEFAULT_ASSETS_URL + "audio/error.mp3")
      audio.volume = ui.getVolume()
      audio.play()
   }

   // Mostra o modal na tela
   show() {
      this.container.removeClass("hide")
      this.container.removeClass("hd")
      $(this.config.target).append(this.getView())
   }

   hide() {
      this.container.addClass("hd")
   }

   // Define o callback de fechamento do modal
   setOnClose(onClose) {
      this.onClose = onClose
   }

   // Define o callback de fechamento do modal
   setOnBeforeClose(onBeforeClose) {
      this.onBeforeClose = onBeforeClose
   }

   // Elimina o modal
   close() {
      if (this.config.detach) {

         this.closeWithDetach()

      } else {

         this.closeWithRemove()

      }
   }

   closeWithRemove() {
      let self = this

      if (this.onClose) {
         this.onClose.call()
      }

      this.container.addClass("hide")

      setTimeout(function () {
         self.container.remove()

         self.onDestroy()
      }, TIME_FAST)
   }

   closeWithDetach() {
      let self = this

      if (this.onClose) {
         this.onClose.call()
      }

      this.container.addClass("hide")

      setTimeout(function () {
         self.container.detach()
         self.onDestroy()
      }, TIME_FAST)
   }

   showFooter() {
      this.modalFooter.removeClass("hd")
   }

   hideFooter() {
      this.modalFooter.addClass("hd")
   }

   // Esconde o loader
   hideLoader() {
      this.loaderContainer.addClass("hd")
   }

   // Mostra o loader
   showLoader() {
      this.loaderContainer.removeClass("hd")
   }

   // Exclui o objeto da memória
   onDestroy() {
      let self = this
      if (self.config.onDestroy) {
         if (typeof self.config.onDestroy === 'function') {

            self.config.onDestroy.call()
         }
      }
      delete this
   }

   setDataAttr(name, value) {
      this.container.attr(name, value)
   }

   getDataAttr(name) {
      return this.container.attr(name.toString())
   }

   /**
    * @returns view
    */
   getView() {
      return this.container
   }
}
