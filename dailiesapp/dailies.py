# Imports
import streamlit as st 
import pandas as pd
import plotly.express as px

import dailiesdb as db

# Main Hub - Overview


#Here there should be an overview of expected vs achieved for the last 3 months

#You have 2 tables: Non-Negotiables and Dailies

#Non-Negotiables are recurring and must be completed every day.

#Dailies are set through the day / the day before. 

#Potential Other Features:
#- Random Picked Motivational Quotes
#- Local Temperature / Weather Widget - DoD Delta
#- Kaizen Streak Counter 
#- Kaizen Longest Streak
#- Email alert for missed tasks / Daily breakdown?


def main():
    st.title("Dailies App")

    menu = ["Create","Read","Update", "Delete", "Extra"]
    choice = st.sidebar.selectbox("Menu", menu)

    # We initialize the table first IF NOT initialized
    db.create_table()


    # Now we introduce states - Create a new task
    if choice == "Create":
        st.subheader("Add Goal")

        # Create Page Layout

        col1,col2 = st.columns(2)

        with col1:
            task = st.text_input("Task to Do")
            task_type = st.selectbox("Task Type", ["Goal", "Non-Negotiable"])

        with col2:
            task_status = "Not done"
            task_start_date = st.date_input("Start Date",value="today")

        if st.button("Add Task"):
            db.create_row(task, task_type, task_status, task_start_date)
            st.success("Successfully added task: {}".format(task))



    elif choice == "Read":
        st.subheader("View Items")

        result = db.select_all()
        df = pd.DataFrame(result, columns=['Task', 'Type', 'Status', 'Start Date', 'Finished Date'])
        
        st.dataframe(df)

        with st.expander("Statistics"):
            count_df = df['Status'].value_counts().to_frame()

            st.dataframe(count_df)
        
        with st.expander("Visualize"):
            
            bar_chart = px.bar(count_df)
            st.plotly_chart(bar_chart)


    elif choice == "Update":
        st.subheader("Edit/Update Items")
    elif choice == "Delete":
        st.subheader("Delete Item")
    else:
        st.subheader("About")



if __name__ == '__main__':
    main()
# Setting Goals Page - Create, Update, Delete records/tasks

# Database/Table Structure

#"""
#Type - Choice - Non-Negotiable/Daily
#Goal - Text Field 
#Done - Boolean
#Date Set - Datetime
#Date Complete - Datetime
#POTENTIAL - Eisenhower? 
#"""