# -*- coding: utf-8 -*-
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import NoAlertPresentException
import unittest, time, re

class Login1(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Firefox()
        self.driver.implicitly_wait(30)
        self.base_url = "http://localhost:3000/"
        self.verificationErrors = []
        self.accept_next_alert = True
    
    def test_login1(self):
        driver = self.driver
        driver.get(self.base_url + "/#/home")
        driver.find_element_by_link_text("Contact").click()
        driver.find_element_by_id("regInputPass").clear()
        driver.find_element_by_id("regInputPass").send_keys("123456")
        driver.find_element_by_id("regInputEmail").clear()
        driver.find_element_by_id("regInputEmail").send_keys("serg@example.com")
        driver.find_element_by_css_selector("button.btn.btn-primary").click()
        driver.find_element_by_link_text("serg").click()
        driver.find_element_by_link_text("Logout").click()
        self.assertTrue(self.is_element_present(By.CSS_SELECTOR, "div.caption"))
        driver.find_element_by_id("regInputPass").clear()
        driver.find_element_by_id("regInputPass").send_keys("123456")
        driver.find_element_by_id("regInputEmail").clear()
        driver.find_element_by_id("regInputEmail").send_keys("serg@example.com")
        driver.find_element_by_xpath("//button[@type='submit']").click()
        self.assertRegexpMatches(driver.current_url, r"^/users/login[\s\S]back=%2Fusers$")
    
    def is_element_present(self, how, what):
        try: self.driver.find_element(by=how, value=what)
        except NoSuchElementException as e: return False
        return True
    
    def is_alert_present(self):
        try: self.driver.switch_to_alert()
        except NoAlertPresentException as e: return False
        return True
    
    def close_alert_and_get_its_text(self):
        try:
            alert = self.driver.switch_to_alert()
            alert_text = alert.text
            if self.accept_next_alert:
                alert.accept()
            else:
                alert.dismiss()
            return alert_text
        finally: self.accept_next_alert = True
    
    def tearDown(self):
        self.driver.quit()
        self.assertEqual([], self.verificationErrors)

if __name__ == "__main__":
    unittest.main()
