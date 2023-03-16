# pdf parser for resume analysis
import os
from io import StringIO

from pdfminer.converter import TextConverter
from pdfminer.layout import LAParams
from pdfminer.pdfdocument import PDFDocument
from pdfminer.pdfinterp import PDFResourceManager, PDFPageInterpreter
from pdfminer.pdfpage import PDFPage
from pdfminer.pdfparser import PDFParser

file_path = "/Users/harmyabhatt/resumeReviewer/database/uploadedResumes/Resume_2023_Latest.pdf"
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





