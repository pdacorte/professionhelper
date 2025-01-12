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
    # Keep data post execution
    data = c.fetchall()
    return data

def select_unique():
    c.execute("SELECT DISTINCT task FROM tasktable")
    data = c.fetchall()
    return data

def return_task(task):
    c.execute("SELECT * FROM tasktable WHERE task='{}'".format(task))
    data = c.fetchall()
    return data

def update_row(updated_task, updated_task_type, updated_task_status, updated_task_start_date, task, task_type, task_status, task_start_date):
    c.execute('UPDATE tasktable SET task=?, task_type=?, task_status=?, task_start_date=? WHERE task=? AND task_type=? AND task_status=? AND task_start_date=?', (updated_task, updated_task_type, updated_task_status, updated_task_start_date, task, task_type, task_status, task_start_date))
    conn.commit()

def delete_row(task):
    c.execute('DELETE FROM tasktable WHERE task="{}"'.format(task))
    conn.commit()

# GOTTA FIGURE THIS OUT LATAER
def completion_date():
    c.execute("""
CREATE TRIGGER IF NOT EXISTS update_task_end_date
AFTER UPDATE OF task_status ON tasktable
FOR EACH ROW
WHEN NEW.task_status = 'Done' AND OLD.task_status = 'Not done'
BEGIN
    UPDATE tasks
    SET task_finish_date = DATE('now')
    WHERE task_id = NEW.task_id;
END;
""")
    c.commit()  # Save changes
#"""
#Type - Choice - Non-Negotiable/Daily
#Goal - Text Field 
#Done - Boolean
#Date Set - Datetime
#Date Complete - Datetime
#POTENTIAL - Eisenhower? 
#"""