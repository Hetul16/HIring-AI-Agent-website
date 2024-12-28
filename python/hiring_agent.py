# import google.generativeai as genai
# import email
# from email.header import decode_header
# import os
# import datetime
# import uuid
# import time
# import shutil
# from PyPDF2 import PdfReader
# import json
# import argparse
# import sys
# import requests
# import imaplib

# import time

# start_time = time.time()

# os.environ['GENAI_API_KEY'] = 'AIzaSyDfEQRE5YZTcuYGcJSqPDfIcGB2XzA8Lig'

# # Now you can use the API key
# genai.configure(api_key=os.getenv("GENAI_API_KEY"))

# def send_status_update(message):
#     print(f"Step X completed in {time.time() - start_time:.2f} seconds 1")
#     try:
#         requests.get(f'http://localhost:5000/api/candidates/status?message={message}')
#     except Exception as e:
#         print(f"Failed to send status update: {str(e)}", file=sys.stderr)

# def login_to_gmail(email_user, email_password):
#     print(f"Step X completed in {time.time() - start_time:.2f} seconds 2")
#     send_status_update("Logging in to Gmail...")
#     try:
#         mail = imaplib.IMAP4_SSL("imap.gmail.com", 993)
#         mail.login(email_user, email_password)
#         send_status_update("Successfully logged in to Gmail.")
#         return mail
#     except imaplib.IMAP4.error as e:
#         send_status_update(f"IMAP error: {str(e)}")
#         raise Exception(f"IMAP error: {str(e)}")
#     except Exception as e:
#         send_status_update(f"Failed to login: {str(e)}")
#         raise Exception(f"Failed to login: {str(e)}")

# def search_emails_with_subject_and_attachments(mail, subject_filter, start_date, end_date):
#     print(f"Step X completed in {time.time() - start_time:.2f} seconds 3")
#     send_status_update("Searching emails with subject and attachments...")
#     try:
#         mail.select("inbox")
#         start_date_obj = datetime.datetime.strptime(start_date, "%Y-%m-%d")
#         end_date_obj = datetime.datetime.strptime(end_date, "%Y-%m-%d")
        
#         start_date_str = start_date_obj.strftime("%d-%b-%Y")
#         end_date_str = end_date_obj.strftime("%d-%b-%Y")
        
#         search_criteria = f'(SINCE "{start_date_str}" BEFORE "{end_date_str}")'
#         status, messages = mail.search(None, search_criteria)

#         if status == "OK":
#             email_ids = []
#             for email_id in messages[0].split():
#                 _, data = mail.fetch(email_id, "(RFC822)")
#                 msg = email.message_from_bytes(data[0][1])
#                 subject_header = decode_header(msg["Subject"])[0][0]

#                 if isinstance(subject_header, bytes):
#                     subject = subject_header.decode()
#                 else:
#                     subject = subject_header

#                 if subject_filter.strip() and subject and subject.lower().find(subject_filter.lower()) != -1:
#                     for part in msg.walk():
#                         if part.get_content_disposition() == "attachment":
#                             email_ids.append(email_id)
#                             break
#             send_status_update(f"Emails found: {len(email_ids)}")
#             return email_ids
#         else:
#             send_status_update("No emails found.")
#             return []
#     except Exception as e:
#         send_status_update(f"Error searching emails: {str(e)}")
#         raise Exception(f"Error searching emails: {str(e)}")

# def clear_folder(folder_path):
#     print(f"Step X completed in {time.time() - start_time:.2f} seconds 4")
#     if os.path.exists(folder_path):
#         for file_name in os.listdir(folder_path):
#             file_path = os.path.join(folder_path, file_name)
#             try:
#                 if os.path.isfile(file_path) or os.path.islink(file_path):
#                     os.unlink(file_path)
#                 elif os.path.isdir(file_path):
#                     shutil.rmtree(file_path)
#             except Exception as e:
#                 raise Exception(f"Failed to delete {file_path}: {str(e)}")

# def fetch_attachments(mail, email_ids, dest_folder):
#     print(f"Step X completed in {time.time() - start_time:.2f} seconds 5")
#     send_status_update("Fetching attachments...")
#     resume_extensions = [".pdf", ".doc", ".docx"]
    
#     clear_folder(dest_folder)

#     for email_id in email_ids:
#         try:
#             status, data = mail.fetch(email_id, "(RFC822)")
#             if status != "OK":
#                 continue

#             msg = email.message_from_bytes(data[0][1])
#             for part in msg.walk():
#                 if part.get_content_disposition() == "attachment":
#                     filename = part.get_filename()
#                     if filename:
#                         unique_id = str(uuid.uuid4())[:8]
#                         filename = f"{unique_id}_{filename}"
#                         filepath = os.path.join(dest_folder, filename)

#                         if any(filename.lower().endswith(ext) for ext in resume_extensions):
#                             with open(filepath, "wb") as f:
#                                 f.write(part.get_payload(decode=True))
#         except Exception as e:
#             send_status_update(f"Error processing email ID: {str(e)}")
#             raise Exception(f"Error processing email ID: {str(e)}")
#     send_status_update("Attachments fetched.")

# def extract_text_from_pdfs(folder_path):
#     print(f"Step X completed in {time.time() - start_time:.2f} seconds 6")  
#     send_status_update("Extracting text from PDFs...")
#     resumes = []
#     for file_name in os.listdir(folder_path):
#         if file_name.endswith(".pdf"):
#             file_path = os.path.join(folder_path, file_name)
#             try:
#                 reader = PdfReader(file_path)
#                 text = " ".join(page.extract_text() for page in reader.pages if page.extract_text())
#                 resumes.append({"file_name": file_name, "text": text})
#             except Exception as e:
#                 print(f"Error processing {file_name}: {str(e)}", file=sys.stderr)
#     send_status_update(f"Text extracted from {len(resumes)} PDFs.")
#     return resumes

# def extract_skills(resume_text):
#     print(f"Step X completed in {time.time() - start_time:.2f} seconds 7")
#     # Predefined list of skills
#     skills_list = [
#         "Python", "Java", "C++", "JavaScript", "SQL", "HTML", "CSS", "Machine Learning",
#         "Data Analysis", "Project Management", "Communication", "Teamwork", "Problem Solving",
#         "Leadership", "Time Management", "Adaptability", "Creativity", "Critical Thinking"
#     ]
    
#     # Extract skills mentioned in the resume text
#     skills = [skill for skill in skills_list if skill.lower() in resume_text.lower()]
#     return skills

# def find_top_candidates(resumes, job_description, num_candidates):
#     print(f"Step X completed in {time.time() - start_time:.2f} seconds 8")
#     send_status_update("Finding top candidates...")
#     # genai.configure(api_key=os.getenv("GENAI_API_KEY"))
    
#     prompt_template = """
#     You are an AI model evaluating resumes. Compare each resume against the following job description:
#     {job_description}

#     Evaluate each resume and provide a ranking of the top {num_candidates} candidates with their alignment score.

#     For each resume, give a score from 0-100 based on how well the candidate matches the job requirements.
#     Format your response as: 
#     Filename: [filename]
#     Score: [score from 0-100]
#     Reasons: [brief explanation of why this candidate matches]
#     """

#     model = genai.GenerativeModel("gemini-pro")
#     candidates = []

#     for resume in resumes:
#         full_prompt = prompt_template.format(
#             job_description=job_description,
#             num_candidates=num_candidates
#         ) + "\n\nResume Text:\n" + resume['text']

#         try:
#             completion = model.generate_content(full_prompt)
#             response_text = completion.text

#             score_match = re.search(r"Score:\s*(\d+)", response_text)
#             score = int(score_match.group(1)) if score_match else 0

#             reasons_match = re.search(r"Reasons:\s*(.+)", response_text, re.DOTALL)
#             reasons = reasons_match.group(1).strip() if reasons_match else "No specific reasons noted."

#             candidates.append({
#                 'name': resume['file_name'],  # Use the file name as the candidate's name
#                 'skills': extract_skills(resume['text']),  # Extract skills from resume text
#                 'relevance': f"{score}%",  # Use the score as the relevance percentage
#                 'score': score,
#                 'reasons': reasons,
#                 'resume_text': resume['text']
#             })

#         except Exception as e:
#             print(f"Error processing resume {resume['file_name']}: {str(e)}", file=sys.stderr)

#     candidates.sort(key=lambda x: x['score'], reverse=True)
#     send_status_update("Top candidates found.")
#     return candidates[:num_candidates]

# def main():
#     parser = argparse.ArgumentParser(description='Process resumes from email')
#     parser.add_argument('--email', required=True)
#     parser.add_argument('--password', required=True)
#     parser.add_argument('--subject', required=True)
#     parser.add_argument('--start-date', required=True)
#     parser.add_argument('--end-date', required=True)
#     parser.add_argument('--job-description', required=True)
#     parser.add_argument('--num-candidates', type=int, required=True)

#     args = parser.parse_args()

#     try:
#         dest_folder = os.path.join(os.path.dirname(__file__), "temp_resumes")
#         os.makedirs(dest_folder, exist_ok=True)
#         print("Destination folder created")

#         mail = login_to_gmail(args.email, args.password)
#         print("Logged into Gmail")
        
#         email_ids = search_emails_with_subject_and_attachments(
#             mail, 
#             args.subject, 
#             args.start_date, 
#             args.end_date
#         )

#         if not email_ids:
#             print(json.dumps([]))
#             return

#         fetch_attachments(mail, email_ids, dest_folder)

#         resumes = extract_text_from_pdfs(dest_folder)

#         candidates = find_top_candidates(
#             resumes,
#             args.job_description,
#             args.num_candidates
#         )

#         print(json.dumps(candidates))

#     except Exception as e:
#         send_status_update(f"Error: {str(e)}")
#         print(json.dumps({
#             "error": str(e)
#         }), file=sys.stderr)
#         sys.exit(1)
#     finally:
#         if 'dest_folder' in locals():
#             clear_folder(dest_folder)

# if __name__ == "__main__":
#     main()



import os
import sys
import time
import email
import imaplib
import uuid
import shutil
import requests
import argparse
from datetime import datetime
from PyPDF2 import PdfReader
import google.generativeai as genai
import logging

# Configure logging
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(sys.stdout),
        logging.FileHandler('hiring_agent.log')
    ]
)

start_time = time.time()

def send_status_update(message):
    current_time = time.time() - start_time
    logging.info(f"[{current_time:.2f}s] {message}")
    try:
        response = requests.get(f'http://localhost:5000/api/candidates/status?message={message}')
        if response.status_code != 200:
            logging.error(f"Status update failed with code: {response.status_code}")
    except Exception as e:
        logging.error(f"Failed to send status update: {str(e)}")

def login_to_gmail(email_user, email_password):
    logging.info(f"[{time.time() - start_time:.2f}s] Attempting Gmail login...")
    send_status_update("Initiating Gmail login...")
    
    try:
        logging.info("Connecting to IMAP server...")
        mail = imaplib.IMAP4_SSL("imap.gmail.com", 993)
        
        logging.info("Attempting login...")
        mail.login(email_user, email_password)
        
        # Verify connection
        mail.list()
        logging.info("Login successful!")
        send_status_update("Successfully logged in to Gmail.")
        return mail
        
    except imaplib.IMAP4.error as e:
        error_msg = f"IMAP error during login: {str(e)}"
        logging.error(error_msg)
        send_status_update(error_msg)
        raise Exception(error_msg)
    except Exception as e:
        error_msg = f"Failed to login: {str(e)}"
        logging.error(error_msg)
        send_status_update(error_msg)
        raise Exception(error_msg)

def search_emails_with_subject_and_attachments(mail, subject_filter, start_date, end_date):
    logging.info(f"[{time.time() - start_time:.2f}s] Searching emails...")
    send_status_update("Searching emails with subject and attachments...")
    try:
        mail.select("inbox")
        # Correct date format for IMAP
        start_date = datetime.strptime(start_date, "%Y-%m-%d").strftime("%d-%b-%Y")
        end_date = datetime.strptime(end_date, "%Y-%m-%d").strftime("%d-%b-%Y")
        date_criteria = f'(SINCE "{start_date}" BEFORE "{end_date}")'
        subject_criteria = f'SUBJECT "{subject_filter}"'
        search_criteria = f'({date_criteria} {subject_criteria})'
        logging.debug(f"Search criteria: {search_criteria}")
        _, message_numbers = mail.search(None, search_criteria)
        logging.info(f"Found {len(message_numbers[0].split())} emails.")
        return message_numbers[0].split()
    except Exception as e:
        error_msg = f"Failed to search emails: {str(e)}"
        logging.error(error_msg)
        send_status_update(error_msg)
        raise Exception(error_msg)

def clear_folder(folder_path):
    logging.info(f"[{time.time() - start_time:.2f}s] Clearing folder {folder_path}...")
    send_status_update(f"Clearing folder {folder_path}...")
    for filename in os.listdir(folder_path):
        file_path = os.path.join(folder_path, filename)
        try:
            if os.path.isfile(file_path) or os.path.islink(file_path):
                os.unlink(file_path)
            elif os.path.isdir(file_path):
                shutil.rmtree(file_path)
        except Exception as e:
            error_msg = f"Failed to delete {file_path}: {str(e)}"
            logging.error(error_msg)
            send_status_update(error_msg)
            raise Exception(error_msg)

def fetch_attachments(mail, email_ids, dest_folder):
    logging.info(f"[{time.time() - start_time:.2f}s] Fetching attachments...")
    send_status_update("Fetching attachments...")
    clear_folder(dest_folder)
    
    for email_id in email_ids:
        try:
            _, data = mail.fetch(email_id, "(RFC822)")
            email_body = email.message_from_bytes(data[0][1])
            
            for part in email_body.walk():
                if part.get_content_disposition() == "attachment":
                    filename = part.get_filename()
                    if filename and filename.lower().endswith('.pdf'):
                        unique_id = str(uuid.uuid4())[:8]
                        safe_filename = f"{unique_id}_{filename}"
                        filepath = os.path.join(dest_folder, safe_filename)
                        with open(filepath, 'wb') as f:
                            f.write(part.get_payload(decode=True))
                        logging.info(f"Saved attachment {safe_filename}")
        except Exception as e:
            error_msg = f"Error processing email {email_id}: {str(e)}"
            logging.error(error_msg)
            send_status_update(error_msg)

def extract_text_from_pdfs(folder_path):
    logging.info(f"[{time.time() - start_time:.2f}s] Extracting text from PDFs...")
    send_status_update("Extracting text from PDFs...")
    resumes = []
    for filename in os.listdir(folder_path):
        if filename.endswith('.pdf'):
            filepath = os.path.join(folder_path, filename)
            try:
                reader = PdfReader(filepath)
                text = " ".join(page.extract_text() for page in reader.pages)
                resumes.append({"filename": filename, "text": text})
                logging.info(f"Extracted text from {filename}")
            except Exception as e:
                error_msg = f"Error processing {filename}: {str(e)}"
                logging.error(error_msg)
                send_status_update(error_msg)
    return resumes

def extract_skills(resume_text):
    logging.info(f"[{time.time() - start_time:.2f}s] Extracting skills from resume text...")
    skills_list = [
        "Python", "Java", "JavaScript", "C++", "SQL", "HTML", "CSS",
        "React", "Node.js", "Docker", "AWS", "Machine Learning",
        "Data Analysis", "Project Management", "Agile"
    ]
    skills = [skill for skill in skills_list if skill.lower() in resume_text.lower()]
    logging.info(f"Extracted skills: {skills}")
    return skills

def find_top_candidates(resumes, job_description, num_candidates):
    logging.info(f"[{time.time() - start_time:.2f}s] Finding top candidates...")
    send_status_update("Finding top candidates...")
    genai.configure(api_key='AIzaSyDfEQRE5YZTcuYGcJSqPDfIcGB2XzA8Lig')
    model = genai.GenerativeModel('gemini-pro')
    
    ranked_candidates = []
    for resume in resumes:
        prompt = f"""
        Job Description: {job_description}
        Resume: {resume['text']}
        Score this candidate from 0-100 based on job fit. Return only the number.
        """
        try:
            response = model.generate_content(prompt)
            score = float(response.text.strip())
            ranked_candidates.append({
                "filename": resume["filename"],
                "score": score,
                "skills": extract_skills(resume["text"])
            })
            logging.info(f"Scored {resume['filename']} with {score}")
        except Exception as e:
            error_msg = f"Error scoring {resume['filename']}: {str(e)}"
            logging.error(error_msg)
            send_status_update(error_msg)
            
    ranked_candidates.sort(key=lambda x: x["score"], reverse=True)
    return ranked_candidates[:num_candidates]

def main():
    parser = argparse.ArgumentParser(description='Process resumes from email')
    parser.add_argument('--email', required=True)
    parser.add_argument('--password', required=True)
    parser.add_argument('--subject', required=True)
    parser.add_argument('--start-date', required=True)
    parser.add_argument('--end-date', required=True)
    parser.add_argument('--job-description', required=True)
    parser.add_argument('--num-candidates', type=int, required=True)
    
    args = parser.parse_args()
    
    dest_folder = "temp_resumes"
    print(f"Step X completed in {time.time() - start_time:.2f} wokingggggg  ")
    os.makedirs(dest_folder, exist_ok=True)
    
    try:
        mail = login_to_gmail(args.email, args.password)
        email_ids = search_emails_with_subject_and_attachments(mail, args.subject, args.start_date, args.end_date)
        fetch_attachments(mail, email_ids, dest_folder)
        resumes = extract_text_from_pdfs(dest_folder)
        top_candidates = find_top_candidates(resumes, args.job_description, args.num_candidates)
        
        print("\nTop Candidates:")
        for i, candidate in enumerate(top_candidates, 1):
            print(f"\n{i}. File: {candidate['filename']}")
            print(f"   Score: {candidate['score']}")
            print(f"   Skills: {', '.join(candidate['skills'])}")
            
    except Exception as e:
        logging.error(f"Error: {str(e)}")
        send_status_update(f"Error: {str(e)}")
        sys.exit(1)
    finally:
        if 'mail' in locals():
            mail.logout()
        if 'dest_folder' in locals():
            clear_folder(dest_folder)

if __name__ == "__main__":
    main()