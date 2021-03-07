$(document).ready(() => {
    const $fieldset = $('fieldset[name="target"]')
    const $radio = ($fieldset[0].elements)
    let target = 'text'

    const $colorField = $('.field')
    const $thumbs = $('.slider__thumb')
    const $fields = $('.slider__field')
    const $fills = $('.slider__fill')
    const colors = {
        text: [0, 0, 0],
        background: [255, 255, 255]
    }
    const $elemGetColor = $('#get-color')[0]
    const point = 255 / ($fields.outerWidth() - $thumbs.outerWidth())

    $thumbs.each((index, elem) => {
        $(elem).draggable({
            axis: 'x', 
            containment: 'parent',
            drag: () => {

                const shift = $(elem).offset().left - $fields.offset().left
                const color = point * shift

                $($fills[index]).css('width', shift + $(elem).outerWidth() / 2 + 'px')
                colors[target][index] = color
                setColor()
            }
        })
    })
        
    $($radio).click(function() {
        target = $(this).val()
        
        $thumbs.each((index, elem) => {
            $(elem).css('left', `${colors[target][index] / point}px`)
        })
        
        $fills.each((index, elem) => {
            $(elem).css('width', `${colors[target][index] / point + $thumbs.outerWidth() / 2 }px`)
        })

        getColorToText()
    })

    function setColor() {
        if (target === 'text') {
            $colorField.css('color', `rgb(${colors[target].join(', ')})`)
        }
        if (target === 'background') {
            $colorField.css('background-color', `rgb(${colors[target].join(', ')})`)
        }

        getColorToText()
    }

    function getColorToText() {

        $($elemGetColor).text(`rgb(${colors[target]
            .map((item, index) => Math.round(item))
            .join(', ')})`
        )
    }
})