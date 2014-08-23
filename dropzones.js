(function (interact) {

    'use strict';

    var position= {};
	var originalPos = {} ;
	var containerHTML = "<div class='row'><div class='large-12 columns container'></div></div>";
	var twoThirdContainerHTML = "<div class='row'><div class='large-8 columns container'></div><div class='large-4 columns container'></div></div>";
	var oneThirdContainerHTML = "<div class='row'><div class='large-4 columns container'></div><div class='large-8 columns container'></div></div>";
    var onehalfContainerHTML = "<div class='row'><div class='large-6 columns container'></div><div class='large-6 columns container'></div></div>";
	var draggedContent = '<div class="drop1 row"><div class="large-12 columns container">&lt;&lt; Drop here &gt;&gt;</div></div>';
    var dateHTML = '<div class="widget date" style="float: left">date</div>';
    var inputHTML = '<div class="widget input" style="float: left">input Element</div>';
    var textHTML = '<div class="widget text" style="float: left">text</div>';
    interact('.js-drag')
        .draggable(true)
        .on('dragstart', function (event) {
            originalPos.x = position.x = parseInt(event.target.dataset.x, 10) || 0;
            originalPos.y = position.y = parseInt(event.target.dataset.y, 10) || 0;
            if($('.drop1').length == 0) {
                if(event.target.classList.contains('containerButton')) {
                    var dropContainerChildren = $('.dropzone').children();
                    if(dropContainerChildren.length > 0 ) {
                        $(dropContainerChildren).each(function(i, ele) {
                            $(ele).after(draggedContent);
                        });
                    }
                    $('.dropzone').prepend(draggedContent);
            } else if(event.target.classList.contains('widgetButton')) {
                $('.container').each(function(index, containerElem) {
				debugger;
                    if($(containerElem).children().length == 0) {
                        $(containerElem).append(draggedContent);
                    }
                });
            }
            }
        })
        .on('dragmove', function (event) {
            position.x += event.dx;
            position.y += event.dy;
            event.target.dataset.x = position.x;
            event.target.dataset.y = position.y;
            event.target.style.webkitTransform = event.target.style.transform = 'translate(' + position.x + 'px, ' + position.y + 'px)';
        }).on('dragend', function(event) {
			event.target.style.webkitTransform = event.target.style.transform = 'none';
			event.target.setAttribute("data-x", "");
			event.target.setAttribute("data-y", "");
    	});

    // setup drop areas.
    // dropzone #1 accepts draggable #1
    setupDropzone('.drop1', '.widgetButton,.containerButton');

    /**
     * Setup a given element as a dropzone.
     *
     * @param {HTMLElement|String} el
     * @param {String} accept
     */
    function setupDropzone(el, accept) {
        interact(el)
            .dropzone({
                accept: accept,
                ondropactivate: function (event) {
                    event.relatedTarget.classList.add('-drop-possible');
                },
                ondropdeactivate: function (event) {
                    event.relatedTarget.classList.remove('-drop-possible');
                }
            })
            .on('dropactivate', function (event) {
                if($('.drop1').length == 0) {
                if(event.target.classList.contains('containerButton')) {
                    var dropContainerChildren = $('.dropzone').children();
                    if(dropContainerChildren.length > 0 ) {
                        $(dropContainerChildren).each(function(i, ele) {
                            $(ele).after(draggedContent);
                        });
                    }
                    $('.dropzone').prepend(draggedContent);
            } else if(event.target.classList.contains('widgetButton')) {
                $('.container').each(function(index, containerElem) {
				debugger;
                    if($(containerElem).children().length == 0) {
                        $(containerElem).append(draggedContent);
                    }
                });
            }
            }
                event.target.classList.add('-drop-possible');
            })
            .on('dropdeactivate', function (event) {
                event.target.classList.remove('-drop-possible');
			    $('.drop1').remove();
            })
            .on('dragenter', function (event) {
			debugger;
                event.target.classList.add('-drop-over');
				}).on('dragleave', function (event) {
                event.target.classList.remove('-drop-over');
            })
            .on('drop', function (event) {
                event.target.classList.remove('-drop-over');
               if(event.relatedTarget.classList.contains('containerButton')) {
				    handleContainerDrop(event);
                } else if(event.relatedTarget.classList.contains('widgetButton')) {
                    handleWidgetDrop(event);
                }
                $('.drop1').remove();
			    event.relatedTarget.style.webkitTransform = event.relatedTarget.style.transform = 'none';
				event.relatedTarget.setAttribute("data-x", "");
				event.relatedTarget.setAttribute("data-y", "");
			});
    }

    function handleWidgetDrop(event) {
        var classList = event.relatedTarget.classList;
        if(classList.contains('dateButton')) {
            $(event.target).after(dateHTML);    
        } else if(classList.contains('inputButton')) {
            $(event.target).after(inputHTML);    
        } else if(classList.contains('textButton')) {
            $(event.target).after(textHTML);    
        }
    }

    function handleContainerDrop(event) {
		if(event.relatedTarget.classList.contains("c")) {
			$(event.target).after(containerHTML);
		} else if(event.relatedTarget.classList.contains("one-third-c")) {
			$(event.target).after(oneThirdContainerHTML);
		}
		else if(event.relatedTarget.classList.contains("two-third-c")) {
			$(event.target).after(twoThirdContainerHTML);
		}
		else if(event.relatedTarget.classList.contains("one-half-c")) {
			$(event.target).after(onehalfContainerHTML);
		}
    }

}(window.interact));
