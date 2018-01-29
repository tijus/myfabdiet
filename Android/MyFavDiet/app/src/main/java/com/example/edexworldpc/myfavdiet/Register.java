package com.example.edexworldpc.myfavdiet;

import android.app.DatePickerDialog;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.Toast;
import com.kosalgeek.asynctask.*;

import java.util.Calendar;
import java.util.HashMap;

public class Register extends AppCompatActivity implements View.OnClickListener, AsyncResponse {

    EditText edittext_name, edittext_email, edittext_password, edittext_phone, dateOfBirth;
    Button btn_register;
    DatePickerDialog datePickerDialog;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
                        .setAction("Action", null).show();
            }
        });
        edittext_name = (EditText) findViewById(R.id.edittext_name);
        edittext_email = (EditText) findViewById(R.id.edittext_email);
        edittext_password = (EditText) findViewById(R.id.edittext_password);
        edittext_phone = (EditText) findViewById(R.id.edittext_phone);
        dateOfBirth = (EditText) findViewById(R.id.dateOfBirth);
        btn_register = (Button)findViewById(R.id.btn_register);
        btn_register.setOnClickListener(this);
        dateOfBirth.setOnClickListener(this);
    }

    @Override
    public void onClick(View view) {
        switch (view.getId()) {
            case R.id.dateOfBirth:
                final Calendar c = Calendar.getInstance();
                int mYear = c.get(Calendar.YEAR); // current year
                int mMonth = c.get(Calendar.MONTH); // current month
                int mDay = c.get(Calendar.DAY_OF_MONTH); // current day
                // date picker dialog
                datePickerDialog = new DatePickerDialog(Register.this,
                        new DatePickerDialog.OnDateSetListener() {

                            @Override
                            public void onDateSet(DatePicker view, int year,
                                                  int monthOfYear, int dayOfMonth) {
                                // set day of month , month and year value in the edit text
                                dateOfBirth.setText(dayOfMonth + "/"
                                        + (monthOfYear + 1) + "/" + year);

                            }
                        }, mYear, mMonth, mDay);
                datePickerDialog.show();
                break;

            case R.id.btn_register:

                if(edittext_name.getText().toString().equals(""))
                {
                    Toast.makeText(Register.this, "Please Fill your Full Name", Toast.LENGTH_SHORT).show();
                }
                else if(edittext_email.getText().toString().equals("") || !(edittext_email.getText().toString().contains("@")))
                {
                    Toast.makeText(Register.this, "Please Fill your correct email address", Toast.LENGTH_SHORT).show();
                }
                else if(edittext_password.getText().toString().equals(""))
                {
                    Toast.makeText(Register.this, "Please Fill your password", Toast.LENGTH_SHORT).show();
                }
                else if(edittext_phone.getText().toString().equals("") || edittext_phone.getText().toString().length()!=10)
                {
                    Toast.makeText(Register.this, "Contact information not filled properly", Toast.LENGTH_SHORT).show();
                }
                else if(dateOfBirth.getText().toString().equals(""))
                {
                    Toast.makeText(Register.this,"Date of birth not entered" , Toast.LENGTH_SHORT).show();
                }
                else {
                    HashMap postData = new HashMap();
                    postData.put("fullName", edittext_name.getText().toString());
                    postData.put("email", edittext_email.getText().toString());
                    postData.put("password", edittext_password.getText().toString());
                    postData.put("phone", edittext_phone.getText().toString());
                    postData.put("dob", dateOfBirth.getText().toString());
                    PostResponseAsyncTask task = new PostResponseAsyncTask(Register.this, postData);
                    task.execute("http://ertsys.esy.es/development/app/services/RegisterService.php");
                }
                break;
        }

    }

    @Override
    public void processFinish(String s) {

    }
}
