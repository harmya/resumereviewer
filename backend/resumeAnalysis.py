# pdf parser for resume analysis
import os
from io import StringIO
import sys
from pdfminer.converter import TextConverter
from pdfminer.layout import LAParams
from pdfminer.pdfdocument import PDFDocument
from pdfminer.pdfinterp import PDFResourceManager, PDFPageInterpreter
from pdfminer.pdfpage import PDFPage
from pdfminer.pdfparser import PDFParser
import json 

# print("starting pdf parser")
dir_path = '/Users/harmyabhatt/resumeReviewer/database/uploadedResumes/'
file_path = dir_path + str(sys.argv[1])
# print(file_path)
fp = open(file_path, 'rb')

parser = PDFParser(fp)
document = PDFDocument(parser)

# get text from pdf
text = StringIO()
parser = PDFParser(fp)
doc = PDFDocument(parser)
rsrcmgr = PDFResourceManager()
device = TextConverter(rsrcmgr, text, laparams=LAParams())
interpreter = PDFPageInterpreter(rsrcmgr, device)
for page in PDFPage.create_pages(document):
    interpreter.process_page(page)

resume_text = text.getvalue()

fp.close()

# print(resume_text)

keywords_skills = [
"Django",
"Flask",
"TurboGears",
"PyTorch",
"Ruby",
"Garden",
"Spring",
"Play",
"Spark",
"Wicket",
"Javalin",
"Netty",
"Reactor",
"Neural",
"Laravel",
"CakePHP",
"Symfony",
"Phalcon",
"Yii",
"Zikula",
"Lumen",
"CodeIgniter",
"ReactJS",
"AngularJS",
"KnockoutJS",
"EmberJS",
"MeteorJS",
"React",
"Vue",
"Gatsby",
"jQuery",
"NativeScript",
"Nuxt.js",
"Phoenix",
"Aeron",
"Apache",
"TensorFlow",
"Core",
"Xamarin",
"ML.NET",
"Infer.NET",
"Express",
"Grails",
"Yesod",
"Caliburn",
"Pidgin",
"Framework",
"Kendo",
"Flutter",
"Ionic",
"Mojito"
]

languages = [
"Python",
"Java",
"JavaScript",
"PHP",
"Ruby",
"Go",
"Kotlin",
"Swift",
"Scala",
"Rust",
"TypeScript",
"C#",
"C++",
"C",
"Objective-C",
"Perl",
"Groovy",
"R",
"Lua",
"Julia",
"Matlab",
"Fortran",
"Ada",
"Assembly",
"COBOL",
"Visual Basic",
"Delphi",
"ABAP",
"PL/SQL",
"SQL",
"HTML",
"CSS",
"XML",
"JSON",
"YAML",
"Markdown",
"LaTeX",
"TeX"
]

# check if resume contains any of the keywords
num = 0
for keyword in keywords_skills:
    for word in resume_text.split(" "):
        if keyword in word:
            num += 1

# check if resume contains any of the languages
num_lang = 0
for language in languages:
    for word in resume_text.split(" "):
        if language in word:
            num_lang += 1

total_score = num + num_lang
json_data = {
    "keywords": num,
    "languages": num_lang,
    "total_score": total_score,
    "ok" : "ok"
}
res = json.dumps(json_data)

print(res)





