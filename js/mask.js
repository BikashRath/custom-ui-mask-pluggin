/*! Copyright (c) 2013 Bikash Rath
 * Licensed under the MIT License (LICENSE.txt).
 */

(function ($) {
    $.fn.extend({
        actualTargetPosition: '',
        /**
		Target is to apply a mask over a div say TARGET.
		*/
        overlaymask: function (imageUrl, maskOpacity) {
            // Adds the position attribute to the TARGET if not present. As mask cannot be applied on a non-positioned attribute
            this.attr('actual-target-position', this.css('position'));
            if (this.css('position') === 'static') {
                this.css({
                    'position': 'relative'
                });
            }

            //Creates a MASK div component which renders over the TARGET.
            var mask = $('<div></div>');
            mask.addClass('overlay-mask');
            var opacity = 0.3;
            mask.css({
                'height': this.height(),
                'width': this.width(),
                'opacity': !isNaN(maskOpacity) ? maskOpacity : opacity
            });

            /*
			Creates a SPINNER component which renders at the center of the MASK.
			The spinner is created out of the image url passed and there is a
			default spinner in case image url is absent.
			*/
            var spinner = $('<div></div>');
            if (imageUrl) {
                var image = $('<img src="' + imageUrl + '"/>');
                image.appendTo(spinner);
                image.one('load', function () {
                    if (this.width > mask.width() || this.height > mask.height()) {
                        spinner.addClass('default-spinner');
                    } else {
                        spinner.css({
                            'width': this.width,
                             'height': this.height,
                             'position': 'absolute',
                             'top': '50%',
                             'left': '50%',
                             'margin-top': -this.height / 2,
                             'margin-left': -this.width / 2,
                             'z-index': 1001,
                             'opacity': 1
                        });
                    }

                });

            } else {
                spinner.addClass('default-spinner');
            }

			spinner.addClass('rotating');

            // Appends the SPINNER to the MASK and MASK to the TARGET.
            spinner.appendTo(mask);
            mask.appendTo(this);

        },

        unmask: function () {
            var mask = $('.overlay-mask', this);
            var position = this.css('position');
            if (this.attr('actual-target-position') !== undefined) {
                var actualTargetPosition = this.attr('actual-target-position');
                if (actualTargetPosition && actualTargetPosition !== this.css('position')) {
                    this.css({
                        'position': actualTargetPosition
                    });
                }
                this.removeAttr('actual-target-position');
            }
            mask.remove();

        }
    });
})(window.jQuery);