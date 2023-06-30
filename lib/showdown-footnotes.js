const footnotes = [
    { 
        type: 'lang', 
        filter: function(text) {

            // Inline footnotes e.g. "foo[^1]"                              
            let i = 0;                                                      
            const inline_regex = /\[\^(\d+|n)\](?!:)/g;   

            text = text.replace(inline_regex, function(match, n) {   

                // We allow both automatic and manual footnote numbering    
                if (n == "n") n = i+1;

                var s = '<sup id="fnref:'+n+'">' +
                            '<a href="#fn:'+n+'" rel="footnote">'+n+'</a>' + 
                        '</sup>';
                i += 1;
                return s;
            });                                                             

            // Expanded footnotes at the end e.g. "[^1]: cool stuff"        
            const end_regex = /\[\^(\d+|n)\]: (.*?)\n/g;                       
            const m = text.match(end_regex);                                  
            const total = m ? m.length : 0;                                   
            i = 0;                                                      

            text = text.replace(end_regex, function(match, n, content) {    
                if (n == "n") n = i+1;                                      

                // console.log(content);                                       
                // var s = '<li class="footnote" id="fn:'+n+'">' +             
                //           '<p>'+content+'<a href="#fnref:'+n +              
                //             '" title="return to article"> ↩</a>' +          
                //           '</p>' +                                          
                //         '</li>'   
                var s = '<li class="punkish-footnote" id="fn:'+n+'">' + 
                            content+'<a href="#fnref:'+n + 
                            '" title="return to article"> ↩</a>' + 
                        '</li>'

                // if (i == 0) {                                               
                //     s = '<div class="footnotes"><ol>' + s;                  
                // }       
                if (i == 0) {                                               
                    s = '<ol class="punkish-footnotes" style="border-top: 1px dotted; font-size: 0.8em">' + s;                  
                }                                                     

                // if (i == total-1) {                                         
                //     s = s + '</ol></div>'                                   
                // }         
                if (i == total-1) {                                         
                    s = s + '</ol>'                                   
                }                                                   

                i += 1;                                                     
                return s;                                                   
            });                                                             

            return text;                                                    
        }
    }                                                                  
];

export { footnotes }