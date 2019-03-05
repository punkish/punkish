// http://complete-ly.appspot.com
function completely(c,f){f=f||{};f.fontSize=f.fontSize||"16px";f.fontFamily=f.fontFamily||"sans-serif";f.promptInnerHTML=f.promptInnerHTML||"";f.color=f.color||"#333";f.hintColor=f.hintColor||"#aaa";f.backgroundColor=f.backgroundColor||"#fff";f.dropDownBorderColor=f.dropDownBorderColor||"#aaa";f.dropDownZIndex=f.dropDownZIndex||"100";f.dropDownOnHoverBackgroundColor=f.dropDownOnHoverBackgroundColor||"#ddd";var l=document.createElement("input");l.type="text";l.spellcheck=false;l.style.fontSize=f.fontSize;l.style.fontFamily=f.fontFamily;l.style.color=f.color;l.style.backgroundColor=f.backgroundColor;l.style.width="100%";l.style.outline="0";l.style.border="0";l.style.margin="0";l.style.padding="0";var k=l.cloneNode();k.disabled="";k.style.position="absolute";k.style.top="0";k.style.left="0";k.style.borderColor="transparent";k.style.boxShadow="none";k.style.color=f.hintColor;l.style.backgroundColor="transparent";l.style.verticalAlign="top";l.style.position="relative";var b=document.createElement("div");b.style.position="relative";b.style.outline="0";b.style.border="0";b.style.margin="0";b.style.padding="0";var e=document.createElement("div");e.style.position="absolute";e.style.outline="0";e.style.margin="0";e.style.padding="0";e.style.border="0";e.style.fontSize=f.fontSize;e.style.fontFamily=f.fontFamily;e.style.color=f.color;e.style.backgroundColor=f.backgroundColor;e.style.top="0";e.style.left="0";e.style.overflow="hidden";e.innerHTML=f.promptInnerHTML;e.style.background="transparent";if(document.body===undefined){throw"document.body is undefined. The library was wired up incorrectly."}document.body.appendChild(e);var p=e.getBoundingClientRect().right;b.appendChild(e);e.style.visibility="visible";e.style.left="-"+p+"px";b.style.marginLeft=p+"px";b.appendChild(k);b.appendChild(l);var j=document.createElement("div");j.style.position="absolute";j.style.visibility="hidden";j.style.outline="0";j.style.margin="0";j.style.padding="0";j.style.textAlign="left";j.style.fontSize=f.fontSize;j.style.fontFamily=f.fontFamily;j.style.backgroundColor=f.backgroundColor;j.style.zIndex=f.dropDownZIndex;j.style.cursor="default";j.style.borderStyle="solid";j.style.borderWidth="1px";j.style.borderColor=f.dropDownBorderColor;j.style.overflowX="hidden";j.style.whiteSpace="pre";j.style.overflowY="scroll";var q=function(u){var v=[];var s=0;var y=-1;var t=function(){this.style.outline="1px solid #ddd"};var r=function(){this.style.outline="0"};var x=function(){w.o3();w.o1(this.__hint)};var w={o3:function(){u.style.visibility="hidden"},refresh:function(B,G){u.style.visibility="hidden";s=0;u.innerHTML="";var F=(window.innerHeight||document.documentElement.clientHeight);var D=u.parentNode.getBoundingClientRect();var A=D.top-6;var C=F-D.bottom-6;v=[];for(var z=0;z<G.length;z++){if(G[z].indexOf(B)!==0){continue}var E=document.createElement("div");E.style.color=f.color;E.onmouseover=t;E.onmouseout=r;E.onmousedown=x;E.__hint=G[z];E.innerHTML=B+"<b>"+G[z].substring(B.length)+"</b>";v.push(E);u.appendChild(E)}if(v.length===0){return}if(v.length===1&&B===v[0].__hint){return}if(v.length<2){return}w.o0(0);if(A>C*3){u.style.maxHeight=A+"px";u.style.top="";u.style.bottom="100%"}else{u.style.top="100%";u.style.bottom="";u.style.maxHeight=C+"px"}u.style.visibility="visible"},o0:function(z){if(y!=-1&&v[y]){v[y].style.backgroundColor=f.backgroundColor}v[z].style.backgroundColor=f.dropDownOnHoverBackgroundColor;y=z},o2:function(z){if(u.style.visibility==="hidden"){return""}if(s+z===-1||s+z===v.length){return v[s].__hint}s+=z;w.o0(s);return v[s].__hint},o1:function(){}};return w};var d=q(j);d.o1=function(r){l.value=k.value=m+r;i.onChange(l.value);n=l.value;setTimeout(function(){l.focus()},0)};b.appendChild(j);c.appendChild(b);var o;var m;function h(r){if(o===undefined){o=document.createElement("span");o.style.visibility="hidden";o.style.position="fixed";o.style.outline="0";o.style.margin="0";o.style.padding="0";o.style.border="0";o.style.left="0";o.style.whiteSpace="pre";o.style.fontSize=f.fontSize;o.style.fontFamily=f.fontFamily;o.style.fontWeight="normal";document.body.appendChild(o)}o.innerHTML=String(r).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;");return o.getBoundingClientRect().right}var i={onArrowDown:function(){},onArrowUp:function(){},onEnter:function(){},onTab:function(){},onChange:function(){i.repaint()},startFrom:0,options:[],wrapper:b,input:l,hint:k,dropDown:j,prompt:e,setText:function(r){k.value=r;l.value=r},getText:function(){return l.value},o3DropDown:function(){d.o3()},repaint:function(){var x=l.value;var w=i.startFrom;var s=i.options;var r=s.length;var v=x.substring(w);m=x.substring(0,w);k.value="";for(var u=0;u<r;u++){var t=s[u];if(t.indexOf(v)===0){k.value=m+t;break}}j.style.left=h(m)+"px";d.refresh(v,i.options)}};var n;var g=function(r,t){n=r.value;var s=function(){var u=r.value;if(n!==u){n=u;t(u)}};if(r.addEventListener){r.addEventListener("input",s,false);r.addEventListener("keyup",s,false);r.addEventListener("change",s,false)}else{r.attachEvent("oninput",s);r.attachEvent("onkeyup",s);r.attachEvent("onchange",s)}};g(l,function(r){i.onChange(r)});var a=function(u){u=u||window.event;var t=u.keyCode;if(t==33){return}if(t==34){return}if(t==27){d.o3();k.value=l.value;l.focus();return}if(t==39||t==35||t==9){if(t==9){u.preventDefault();u.stopPropagation();if(k.value.length==0){i.onTab()}}if(k.value.length>0){d.o3();l.value=k.value;var v=n!=l.value;n=l.value;if(v){i.onChange(l.value)}}return}if(t==13){if(k.value.length==0){i.onEnter()}else{var s=(j.style.visibility=="hidden");d.o3();if(s){k.value=l.value;l.focus();i.onEnter();return}l.value=k.value;var v=n!=l.value;n=l.value;if(v){i.onChange(l.value)}}return}if(t==40){var r=d.o2(+1);if(r==""){i.onArrowDown()}k.value=m+r;return}if(t==38){var r=d.o2(-1);if(r==""){i.onArrowUp()}k.value=m+r;u.preventDefault();u.stopPropagation();return}k.value=""};if(l.addEventListener){l.addEventListener("keydown",a,false)}else{l.attachEvent("onkeydown",a)}return i};

var S = {
    $: function(el) {
        return document.getElementById(el);
    },
    
    gl: [
        {n: "Anonymized sample/data",
        d: "The link between samples and data collected by a biobank and the identity of the donor never existed (following donation) or has been destroyed so that it would be impossible under any circumstances to re-link the sample and data with the donor. If a link is kept the sample is not truly anonymized."},

        {n: "Benefit sharing",
        d: "Sharing the rewards derived from research into human genetics with tissue donors, patients and/or humankind."},

        {n: "Biobank",
        d: "A collection of biological samples connected to health information."},

        {n: "Biological samples (or Biospecimen)",
        d: "Materials from the human body, such as tissue, blood, plasma, and urine that can be used for diagnosis and analysis of patients."},

        {n: "Clinical Research",
        d: "Study of a drug, biological compound, or device in human subjects to determine its effect on health or disease."},

        {n: "Clinical Trial",
        d: "Researchers test hypotheses with human participants about the effect of a particular intervention (such as a new drug) upon a disease condition in comparison with another drug or an inactive substance (placebo) upon a control group that lacks the disease condition."},

        {n: "Commercialization",
d: "To arrange activities and products for the purpose of gaining profit and/or stimulating investment."},

        {n: "Confidentiality",
        d: "The promise made by someone, for example by your physician, that medical information will only be disclosed to authorized users at specific times of need."},

        {n: "Data",
        d: "A collection of factual information, often in the form of numbers, that is used as a basis for reasoning or calculation. In health research data include things like age, sex, or symptoms of disease."},

        {n: "Data Access Committee (DAC)",
        d: "Data Access Committees are established based on programmatic areas of interest as well as technical and ethical expertise. All DACs will operate through common principles and under similar mechanisms to ensure the consistency and transparency of the controlled- data access process."},

        {n: "Data security",
        d: "The processes and mechanisms used to control the disclosure of information. It is the protection of computer‐based information from unauthorized access, destruction, modification, or disclosure."},

        {n: "Data Use Certification (DUC)",
        d: "A Data Use Certification is the application a user submits to a particular study's Data Access Committee (DAC) for consideration for authorized use of controlled dbGaP data. The Data Use Certification should include a list of the controlled data set(s) required by the user and a brief description of the proposed research use of the requested data. The user must also offer the following assurances in the Data Use Certification that: <ol><li>the data will only be used for approved research</li><li>data confidentiality will be protected</li><li>all applicable laws, local institutional policies, and terms and procedures specific to the study's data access policy for handling dbGaP data will be followed</li><li>no attempts will be made to identify individual study participants from whom data were obtained</li><li>controlled-access data from dbGaP will not be sold or shared with third parties</li><li>the contributing investigator(s) who conducted the original study and the funding organizations involved in supporting the original study will be acknowledged in publications resulting from the analysis of those data</li><li>all NIHsupported genotype/phenotype data and conclusions derived directly from them will remain in the public domain, without licensing requirements</li><li>an annual research progress report will be submitted to the study's DAC</li></ol>"},

        {n: "Deliberation",
        d: "Respectful discussion in which participants offer views, reasons and questions in an attempt to understand each other and determine agreements and disagreements."},

        {n: "Deidentification",
        d: "The process of removing information from research data or from medical records sothat it can no longer link to a particular person. An example is removal of a medical record number or date of birth."},

        {n: "Deliberative Democracy",
        d: "A form of representative democracy which involves groups of citizens who discuss and make recommendations about policy issues; an approach focused on enhancing political participation."},

        {n: "DNA",
        d: "An abbreviation for deoxyribonucleic acid, the essential molecule of heredity. The twisted ladder of the base pairs (also more famously known as the double helix) of the DNA molecule contains the chemicallycoded instructions to construct and maintain a living organism."},

        {n: "Drug development",
        d: "The process of bringing a drug discovery through the stages needed for it to be tested in a human clinical trial."},

        {n: "Electronic Medical Record",
        d: "This is a computer‐based record, collected over time, of a patient’s medical information. It replaces the paper chart. It includes patient details, such as age, sex, disease history, physician notes, medications, vital signs, past medical history, immunizations, laboratory data, and radiology reports. These records are usually kept by a hospital or physician group. It is sometimes called the Electronic Health Record."},

        {n: "Epidemiology",
        d: "The study of how often diseases occur in different populations and why."},

        {n: "Eugenics",
        d: "Term coined in 1883 by Sir Francis Galton (1822-1911) meaning 'wellborn.' The term is rooted in the belief that nature is more important than nurture and the social philosophy that humanity can be improved through intervention. Historically associated with Nazi abuses such as the extermination of certain populations, but today is debated with reference to reproductive and genetic technologies."},

        {n: "Gene",
        d: "Genes are both units of inheritance and encoded messages for the creation of a functional unit in a cell. These functional units influence, to varying degrees, an organism’s appearance, its metabolism and sometimes even its behavior, among other things."},

        {n: "Genetic disease",
        d: "A disease caused (or strongly influenced) by abnormalities in an individual’s genetic material (genome). For example, Huntington’s disease, Tay-Sachs disease and Parkinson’s disease are all considered genetic diseases or disorders."},

        {n: "Genetic markers",
        d: "A specific genetic trait that has a molecular feature that can be used to measure or indicate the effects, progress or potential to develop a disease."},

        {n: "Genome",
        d: "(1) The full set of genes carried by a single organism and (2) the set carried by that organism’s species. The precise ordering of nucleotides (one molecular component of DNA) in organisms’ genomes is the foundation of life’s diversity. It dictates whether an organism is human or another species, such as yeast, rice, wombat, gnat or fruit fly, all of which have their own genomes and either are or could be the focus of a genome project. Because all organisms are related through similarities in DNA sequences, insights gained from nonhuman genomes often lead to new knowledge about human biology."},

        {n: "Genetic testing",
        d: "Any procedure to determine whether a person has a gene that is associated with a disease or characteristic."},

        {n: "Genomics",
        d: "A discipline dedicated to the understanding of the entire genetic information content of an organism and its relation to environment and the whole organism."},

        {n: "Governance",
        d: "The policies and practices used to accomplish the management of an institution or project."},

        {n: "Health Information Portability and Accountability Act (HIPAA)",
        d: "Also, known as the “HIPAA privacy rule,” this 2003 federal law established standards for data security of electronic health information and for sharing of personal health information."},

        {n: "Informed Consent",
        d: "The process of informing a patient of the nature of a research study and the potential risks and benefits of being involved."},

        {n: "Institutional Review Board (IRB)",
        d: "A committee that performs ethical review of research with human subjects. Committees must meet standards set by the Office of Human Research Protections, part of the Department of Health and Human Services. When the IRB is not satisfied that the protocol meets established ethical standards, it can prevent the research from starting or, where concerns arise in relation to ongoing research, from continuing."},

        {n: "Mayo Clinic Health System",
        d: "The health system is a regional network of clinics and hospitals dedicated to serving the health needs of people in 70 counties throughout Iowa, Minnesota, and Wisconsin. Many of the clinics provide primary care."},

        {n: "Medical record",
        d: "The information entered and maintained by your doctors and other health care professionals, which documents your health history, medical visits, drugs you have been administered, test results, and other details of your medical care, such as x-rays or surgical reports. Doctors are required to enter and store complete, accurate records of their patients’ care. However, these records often include sensitive, personal information and are considered the property of the patient who can obtain a copy at any time."},

        {n: "Minnesota Research Authorization",
        d: "A state‐wide policy that requires institutions engaging in medical records research to request permission from patients prior to using their records."},

        {n: "Mutation",
        d: "Errors in copying base pairs of DNA when cells are dividing. Most mutations are silent, meaning that they do not change the protein specified by the gene. Other mutations are fatal to embryos or the basis for the evolution of new characteristics."},

        {n: "Patient",
        d: "A person receiving or registered to receive health care."},

        {n: "Personalized (or precision) medicine",
        d: "The use of detailed information about a patient's genotype or level of gene expression and a patient's clinical data in order to select a medication, therapy or preventative measure that is particularly suited to that patient."},

        {n: "Personal health information (PHI)",
        d: "The information collected by a doctor or other health care professional to identify an individual and decide how to provide them with medical care. Generally, personal health information, or PHI, includes demographic information, medical history, test results, and even insurance information."},

        {n: "Pharmacogenomics (or pharmacogenetics)",
        d: "The study of the genetic basis for responses to drug therapies, with the intention to ensure maximum efficacy with minimal adverse effects. It is the basis of claims about personalized medicine, in which drugs and drug combinations are optimized for each individual's unique genetic makeup."},

        {n: "Population‐based research",
        d: "Research that includes all of the inhabitants of a given geographic area, like a country or city, as a group."},

        {n: "Population health",
        d: "The measures of health, including lack of disease, longevity and other factors, across the members of a group."},

        {n: "Privacy",
        d: "The claim of an individual to decide what information about himself or herself should be known by others."},

        {n: "Stigmatization",
        d: "To characterize or brand as disgraceful or undesirable. Many diseases carry stigma, such as AIDS, tuberculosis, or mental illness. The specific conditions that are stigmatized change over time."},

        {n: "Tissue",
        d: "Human cells from any part of the body. This includes blood, urine, skin, and saliva."},

        {n: "Whole genome sequencing",
        d: "The process by which scientists are able to create a full copy of every piece of an individual’s DNA."}
    ],

    sl: [],
    
    popList: function(text) {
        var html = '';
        if (text === '-1') {
            for (var i=0, j=S.gl.length; i<j; i++) {
                html += '<dt>' + S.gl[i].n + '</dt><dd>' + S.gl[i].d + '</dd>';
                S.sl.push(S.gl[i].n);
            }
        }
        else {
            for (var i=0, j=S.gl.length; i<j; i++) {
                if (S.gl[i].n.indexOf(text) > -1) {
                    html += '<dt>' + S.gl[i].n + '</dt><dd>' + S.gl[i].d + '</dd>';
                }
            }
        }
        
        S.$('deflist').innerHTML = html;
    }
}

S.popList('-1');

var pv = completely(
    document.getElementById('container'), 
    {
        fontFamily:'sans-serif'
        // fontSize:'26px'
    }
);
//pv.setText();

pv.onChange = function(text) {
    
    // http://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript
    // remove /g from the .replace below
    text = text.replace(/\w\S*/, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    
    S.popList(text);
    pv.repaint();
}

pv.options = S.sl;
pv.prompt = 'search';
pv.hint = 'type something';
setTimeout(function() { pv.input.focus(); pv.repaint(); },0);