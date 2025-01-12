import sqlite3

conn = sqlite3.connect("dailies.db", check_same_thread=False)

c = conn.cursor()


# Table

def create_table():
    c.execute('CREATE TABLE IF NOT EXISTS tasktable(task TEXT, task_type TEXT, task_status TEXT, task_start_date DATE, task_end_date DATE)')

def create_row(task, task_type, task_status, task_start_date):
    c.execute('INSERT INTO tasktable(task, task_type, task_status, task_start_date) VALUES (?,?,?,?)', (task, task_type, task_status, task_start_date))
    conn.commit()

def select_all():
    c.execute('SELECT * FROM tasktable')
    data = c.fetchall()
    return data

#"""
#Type - Choice - Non-Negotiable/Daily
#Goal - Text Field 
#Done - Boolean
#Date Set - Datetime
#Date Complete - Datetime
#POTENTIAL - Eisenhower? 
#"""