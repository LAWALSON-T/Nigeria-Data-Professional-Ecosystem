from selenium.common.exceptions import NoSuchElementException, ElementClickInterceptedException
from selenium import webdriver
import time
import pandas as pd

def get_jobs(num_jobs, verbose, path, slp_time):

    '''Gathers jobs as a dataframe, scraped from Glassdoor'''

    #Initializing the webdriver
    options = webdriver.ChromeOptions()

    #Uncomment the line below if you'd like to scrape without a new Chrome window every time.
    #options.add_argument('headless')

    #Change the path to where chromedriver is in your home folder.
    driver = webdriver.Chrome(executable_path='', options=options)
    driver.set_window_size(1120, 1000)
 
    url = "https://www.glassdoor.com/Job/nigeria-data-analyst-jobs-SRCH_IL.0,7_IN177_KO8,20.htm?clickSource=searchBox"
    #url = 'https://www.glassdoor.com/Job/jobs.htm?sc.keyword="' + keyword + '"&locT=C&locId=1147401&locKeyword=San%20Francisco,%20CA&jobType=all&fromAge=-1&minSalary=0&includeNoSalaryJobs=true&radius=100&cityId=-1&minRating=0.0&industryId=-1&sgocId=-1&seniorityType=all&companyId=-1&employerSizes=0&applicationType=0&remoteWorkType=0'
    driver.get(url)
    jobs = []

    while len(jobs) < num_jobs:  #If true, should be still looking for new jobs.

        #Let the page load. Change this number based on your internet speed.
        #Or, wait until the webpage is loaded, instead of hardcoding it.
        time.sleep(slp_time)

        #Test for the "Sign Up" prompt and get rid of it.
        try:
            driver.find_element_by_class_name("selected").click()
        except ElementClickInterceptedException:
            print("no-selected")
            pass

        time.sleep(.1)

        try:
            driver.find_element_by_css_selector('[alt="Close"]').click() #clicking to the X.
            print(' x out worked')
        except NoSuchElementException:
            print(' x out failed')
            pass


        #Going through each job in this page
        resultSet = driver.find_element_by_xpath('.//*[@id="MainCol"]/div[1]/ul')  #jl for Job Listing. These are the buttons we're going to click.
        #print(job_buttons.text)
        job_buttons = resultSet.find_elements_by_tag_name("li")
        print(f"length of jobbuttons is {len(job_buttons)}")
        for job_button in job_buttons:

            print("Progress: {}".format("" + str(len(jobs)) + "/" + str(num_jobs)))
            if len(jobs) >= num_jobs:
                break
            try:
                job_button.click()  #You might 
                time.sleep(1)
                collected_successfully = True
            except:
                continue
            print(collected_successfully)
            while collected_successfully:
                try:
                    company_name = driver.find_element_by_xpath('.//div[@data-test="employerName"]').text
                    print(company_name)
                    location = driver.find_element_by_xpath('.//*[@id="JDCol"]/div/article/div/div[1]/div/div/div[1]/div[3]/div[1]/div[3]').text
                    print(location)
                    job_title = driver.find_element_by_xpath('.//*[@id="JDCol"]/div/article/div/div[1]/div/div/div[1]/div[3]/div[1]/div[2]').text
                    print(job_title)
                    job_description = driver.find_element_by_xpath('.//*[@id="JobDesc1008516311179"]/div').text
                    print(collected_successfully,"2")
                    collected_successfully = False
                    
                except:
                    time.sleep(5)

            try:
                salary_estimate = driver.find_element_by_xpath('.//*[@id="JDCol"]/div/article/div/div[2]/div[1]/div[2]/div/div/div[1]/div[1]').text
            except NoSuchElementException:
                salary_estimate = -1 #You need to set a "not found value. It's important."

            #try:
                #rating = driver.find_element_by_xpath('.//span[@class="rating"]').text
            #except NoSuchElementException:
                #rating = -1 #You need to set a "not found value. It's important."

            #Printing for debugging
            if verbose:
                print("Job Title: {}".format(job_title))
                print("Salary Estimate: {}".format(salary_estimate))
                print("Job Description: {}".format(job_description[:500]))
                #print("Rating: {}".format(rating))
                print("Company Name: {}".format(company_name))
                print("Location: {}".format(location))
            else:
                print("not,verbose")


            jobs.append({"Job Title" : job_title,
            "Salary Estimate" : salary_estimate,
            "Company Name" : company_name,
            "Location" : location})
            #add job to jobs
        #Clicking on the "next page" button
        try:
            driver.find_element_by_xpath('.//*[@id="MainCol"]/div[2]/div/div[1]/button[7]').click()   #//[@id="MainCol"]/div[2]/div/div[1]/button[7]      #//*[@id="MainCol"]/div[2]/div/div[1]/button[7]/span
        except NoSuchElementException:
            print("Scraping terminated before reaching target number of jobs. Needed {}, got {}.".format(num_jobs, len(jobs)))
            break

    return pd.DataFrame(jobs).reset_index()  

path = "chromedriver"

df = get_jobs(200, True, path, 5)
df.to_csv('Uncleaned_Data_prof_jobs.csv', index=False)