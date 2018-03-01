
(function(window,undefined){
        var $ = window.$;

        if (!$){
            throw('$ is not founded');
        }
        var start_node;

        var changeNode =   function (start_node,end_node,direction){
            //li的直接父ul节点
            var $parent_ul=$(start_node).closest('ul');
            var length = $parent_ul.children('li.menu-node').length;
            //start_node是开始操作被拖动的节点
            var $start_node=$(start_node);
            var start_node_index=$start_node.index();
            var start_context= $start_node.clone(true);
            var start_pre_node= $parent_ul.children('li.menu-node')[start_node_index-1];
            var start_next_node= $parent_ul.children('li.menu-node')[start_node_index+1];
            
            
             //end_node是目标节点
            var $end_node=$(end_node);
            var end_node_index=$end_node.index();
            var end_context= $end_node.clone(true);
            var end_pre_node= $parent_ul.children('li.menu-node')[end_node_index-1];
        
            if (direction ===1){//向下移动
                if (start_node_index-1 > -1){
                    //说明此时这个被拖动节点不在第一个位置，把目标节点插到这个位置上
                   $(start_pre_node).after(end_context.css('top',''));
                   $end_node.remove();
                   
                }else{
                    //说明此时这个被拖动节点在第一个位置，把目标节点插到这个位置上
                    $parent_ul.prepend(end_context.css('top',''));
                    $end_node.remove();
                }
            }else {//向上移动
                if (start_node_index < length-1){
                    //说明此时这个被拖动节点不在最后一个位置，把目标节点插到这个位置上
                   $(start_next_node).before(end_context.css('top',''));
                   $end_node.remove();
                   
                }else{
                    //说明此时这个被拖动节点在最后位置，把目标节点插到这个位置上
                    $parent_ul.append(end_context.css('top',''));
                    $end_node.remove();
                }
            }
        
          
            $start_node.css('top','');
            $parent_ul.find('.menu-node.active').removeClass('active')
        
          
        }
        
        var dragenter_handler = function (e){
            // console.log('now enter the node');
            console.log(e.originalEvent.clientY);
            
            e.preventDefault();
            var start_parent = start_node.parentNode;
            var target_parent = e.target.parentNode;
            if (e.target !== start_node && e.target.tagName === 'LI' && start_parent ===target_parent ){
            // $(this).off('dragenter');
                
                // console.log(e.target);
                changeAnimate(start_node,e.target);
                
            }
            // e.preventDefault();
        }
        
        var changeAnimate = function (start_node,end_node){
            var animate_height = Math.max($(start_node).outerHeight(),$(end_node).outerHeight()); 
            var direction = $(start_node).index() > $(end_node).index() ? -1:1;
         
            $(start_node).css('top',direction  * animate_height+'px');
           $(end_node).css('top',direction * -1 * animate_height+'px');
            changeNode(start_node,end_node,direction);
            
        }
        
        $.fn.extend({
            "initDragMenu": function (callback) {
                $(this).on('dragstart',function(e){
                    start_node=e.target;
                    $(start_node).closest('.menu-node').css('opacity','.4');
                    
                }).on('dragover',function(e){
                   
                    e.preventDefault();
                }).one('dragenter',dragenter_handler)
                .on('dragleave',function(e){
                    $(this).one('dragenter',dragenter_handler);
                })
                .on('drop',function(e){
                    $(start_node).closest('.menu-node').css('opacity','1');
                   callback && callback();
                   
                }).on('mousedown',function(e){
                     $(e.target).closest('.menu-node').addClass('active');
                }).on('mouseup',function(e){
                    $(this).find('.menu-node.active').removeClass('active');
                });
               
            }
        });

})(window)

    

    
    

