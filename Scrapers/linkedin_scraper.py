import time
import json
import selenium.common
from selenium import webdriver
from selenium.webdriver.chrome import options, service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

EMAIL = "YOUR EMAIL"
PASSWORD = "YOUR PASSWORD"

# Required dependencies to use selenium
service = service.Service("chromedriver.exe")
driver_options = options.Options()
driver_options.add_experimental_option("detach", True)
driver = webdriver.Chrome(service=service, options=driver_options)


def get_url(keyword, location):
    """
    selenium will open the search url formulated from the keyword and location
    :param keyword: Job keyword to search for
    :param location: Where to search in

    """
    base_url = "https://www.linkedin.com/jobs/search/"
    if " " in keyword:
        keyword = keyword.replace(" ", "%20")
    driver.get(url=f"{base_url}?keywords={keyword}&location={location}&refresh=true")
    driver.maximize_window()


def log_in(email, password):
    """
    In this function, selenium logs into your LinkedIn account
    :param email: Your login email
    :param password: Your login password
    :return: No return
    Selenium will automatically log into your LinkedIn account
    """
    time.sleep(5)
    sign_in_button = driver.find_element(by=By.LINK_TEXT, value="Sign in")
    sign_in_button.click()
    email_input = driver.find_element(by=By.NAME, value="session_key")
    email_input.send_keys(email)
    password_input = driver.find_element(by=By.NAME, value="session_password")
    password_input.send_keys(password)
    password_input.send_keys(Keys.ENTER)


def get_jobs_list():
    """
    This function extracts the list of jobs per page
    :return:(list) The list of jobs found
    """
    job_list = driver.find_elements(by=By.CSS_SELECTOR,
                                    value="ul.scaffold-layout__list-container li.occludable-update")
    print(len(job_list))
    return job_list


def get_total_pages():
    """
    This function gets the total page of jobs found. Although this function is not used herein, it may prove useful
    to someone else.
    :return:(int)total_pages: Total number of pages(if needed)
    """
    pages = driver.find_elements(by=By.CSS_SELECTOR, value="ul.artdeco-pagination__pages--number "
                                                           "li.artdeco-pagination__indicator")
    total_pages = int(pages[len(pages) - 1].get_attribute("data-test-pagination-page-btn"))
    # print(total_pages)
    return total_pages


def get_job_details():
    global final_job_details
    """
    This function extracts all the job details as required
    :return: final_job_details-->dictionary of dictionaries
    """
    for i in range(1, 4):  # get details from 3 pages.....each page contains around 25 jobs
        time.sleep(5)
        jobs = get_jobs_list()
        for job in jobs:
            driver.execute_script("arguments[0].scrollIntoView();", job)  # scroll down to the job
            job_link = job.find_element(by=By.CSS_SELECTOR,
                                        value="div.artdeco-entity-lockup__title a.job-card-list__title")
            time.sleep(1)
            job_link.click()
            time.sleep(2)
            current_job_detail = {}
            # current_job_detail = {
            #     # dictionary to store the needed details
            #     "job_title": job.find_element(by=By.CSS_SELECTOR, value="a.job-card-list__title").text,
            #     "company_name": job.find_element(by=By.CSS_SELECTOR,
            #                                      value="a.job-card-container__company-name").text,
            #     "location": job.find_element(by=By.CLASS_NAME, value="job-card-container__metadata-item").text,
            #     "description": driver.find_element(by=By.ID, value="job-details").text
            # }
            try:
                workplace_type = job.find_element(by=By.CSS_SELECTOR,
                                                  value="li.job-card-container__metadata-item--workplace-type").text
                job_title = job.find_element(by=By.CSS_SELECTOR, value="a.job-card-list__title").text
                company_name = job.find_element(by=By.CSS_SELECTOR,
                                                value="a.job-card-container__company-name").text,
                location = job.find_element(by=By.CLASS_NAME, value="job-card-container__metadata-item").text,
                description = driver.find_element(by=By.ID, value="job-details").text
            except selenium.common.NoSuchElementException:
                continue
            else:
                current_job_detail["job_title"] = job_title
                current_job_detail["company_name"] = company_name
                current_job_detail["location"] = location
                current_job_detail["description"] = description
                current_job_detail["workplace_type"] = workplace_type
            print(current_job_detail)
            final_job_details.append(current_job_detail)
        driver.find_element(by=By.XPATH, value=f"//button[@aria-label='Page {i + 1}']").click()  # go the next page
        time.sleep(2)
    return final_job_details


def save_data_as_json(raw_data: list, job_title: str, job_place: str):
    """
    This function saves the extracted raw data into a json file with the job title and job location forming the file
    name :param raw_data: (list of dict) job raw data :param job_title: (str) title of job searched for :param
    job_place: (str) location of job :return: No return
    """
    with open(f"{job_title}_{job_place}.json", "a") as final:
        json.dump(raw_data, final, indent=4)


# ________________________________________________ RUNNING THE BOT _____________________________________________________

# Details of job to search for
job_name = "Data Scientist"
job_location = "Nigeria"

# Get the url and log in to Your LinkedIn account
get_url(job_name, job_location)
log_in(email=EMAIL, password=PASSWORD)

# # Wait for response from page
time.sleep(10)

# print(get_total_pages())
final_job_details = []
# Extract job details
job_raw_data = get_job_details()
save_data_as_json(raw_data=job_raw_data, job_title=job_name, job_place=job_location)
