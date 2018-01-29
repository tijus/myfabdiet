package com.example.edexworldpc.myfavdiet;

import android.content.Intent;
import android.provider.Settings;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class NoInternet extends AppCompatActivity implements View.OnClickListener {

    Button noconnectbtn;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_no_internet);

        noconnectbtn = (Button)findViewById(R.id.noconnectbtn);
        noconnectbtn.setOnClickListener(this);
    }

    @Override
    public void onClick(View view) {
        startActivityForResult(new Intent(Settings.ACTION_SETTINGS), 0);
        return;
    }

    @Override
    public void onPointerCaptureChanged(boolean hasCapture) {

    }
}
