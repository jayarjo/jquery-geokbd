    (function ($, undefined) {
        //options - is geokbd standart options object
        //form - is html form element which contains many of inputs
        //call geokbd for spesific form:  ('#kbd-switcher').geokbd($('#myform'));
        $.fn.geokbd = function(form,options) {
            var
                isOn,
                inputs = $([]),
                switchers = $([]),
                defaults = {
                    on: true,
                    hotkey: '`'
                },
                settings = (typeof options === 'object' ? $.extend({}, defaults, options) : defaults);

            // first come up with affected set of input elements
            this.each(function() {
                var $this = $(this);

                if ($this.is(':text, textarea')) {
                    inputs = inputs.add($this);
                } else if ($this.is('form')) {
                    inputs = inputs.add($this.find(':text, textarea'));
                } else if ($this.is(':checkbox')) {
                    if (!inputs.length) {
                        inputs = $(':text, textarea');
                    }
                    switchers = switchers.add($this); // store the checkboxes for further manipulation
                }

                if (typeof settings.exclude === 'string') {
                    inputs = inputs.not(settings.exclude);
                }
            });

            // mutate switchers
            switchers
                .click(function() { toggleLang() })
                .wrap('<div class="gk-switcher"></div>')
                .parent()
                .append('<div class="gk-ka" /><div class="gk-us" />');

            // turn on/off all switchers
            toggleLang(isOn = settings.on);

            //if form parameter exist works in form if not works in whole document
            var doc = $(document);
            if (typeof form === 'object') {
                doc = $(form);
            }
            doc.keypress(function (e) {
                var ch = String.fromCharCode(e.which), kach;

                if (settings.hotkey === ch) {
                    toggleLang();
                    e.preventDefault();
                }

                if (!isOn || !inputs.filter(e.target).length) {
                    return;
                }

                kach = translateToKa.call(ch);

                if (ch != kach) {
                    if (navigator.appName.indexOf("Internet Explorer") != -1) {
                        window.event.keyCode = kach.charCodeAt(0);
                    } else {
                        pasteTo.call(kach, e.target);
                        e.preventDefault();
                    }
                }
            });

            function toggleLang() {
                isOn = arguments[0] !== undefined ? arguments[0] : !isOn;
                switchers
                    .each(function() {
                        this.checked = isOn;
                    })
                    .closest('.gk-switcher')[isOn ? 'addClass' : 'removeClass']('gk-on');
            }

            // the following functions come directly from Ioseb Dzmanashvili's GeoKBD (https://github.com/ioseb/geokbd)

            function translateToKa() {
                /**
                * Original idea by Irakli Nadareishvili
                * http://www.sapikhvno.org/viewtopic.php?t=47&postdays=0&postorder=asc&start=10
                */
                var index, chr, text = [], symbols = "abgdevzTiklmnopJrstufqRySCcZwWxjh";

                for (var i = 0; i < this.length; i++) {
                    chr = this.substr(i, 1);
                    if ((index = symbols.indexOf(chr)) >= 0) {
                        text.push(String.fromCharCode(index + 4304));
                    } else {
                        text.push(chr);
                    }
                }
                return text.join('');
            }

            function pasteTo(field) {
                field.focus();
                if (document.selection) {
                    var range = document.selection.createRange();
                    if (range) {
                        range.text = this;
                    }
                } else if (field.selectionStart != undefined) {
                    var scroll = field.scrollTop, start = field.selectionStart, end = field.selectionEnd;
                    var value = field.value.substr(0, start) + this + field.value.substr(end, field.value.length);
                    field.value = value;
                    field.scrollTop = scroll;
                    field.setSelectionRange(start + this.length, start + this.length);
                } else {
                    field.value += this;
                    field.setSelectionRange(field.value.length, field.value.length);
                }
            };
        }

       
    }(jQuery));
   
