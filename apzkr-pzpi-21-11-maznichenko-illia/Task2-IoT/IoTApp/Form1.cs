using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Text.Json;
using IoTApp;
using static System.Windows.Forms.VisualStyles.VisualStyleElement;

namespace IoTApp
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }


        private void button1_Click(object sender, EventArgs e)
        {
            var id = int.Parse(numericUpDown1.Value.ToString());
            var x = int.Parse(numericUpDown2.Value.ToString());
            var y = int.Parse(numericUpDown3.Value.ToString());

            var weatherCondition = new TrainPos()
            {
                Id = id,
                CurrentLocationX = x,
                CurrentLocationY = y,
            };

            using (var client = new HttpClient())
            {
                string url = "https://localhost:5001/api/Trains/" + id;
                var json = JsonSerializer.Serialize(weatherCondition);

                var content = new StringContent(json, Encoding.UTF8, "application/json");
                var request = new HttpRequestMessage(new HttpMethod("PATCH"), url)
                {
                    Content = content
                };

                try
                {
                    var response = client.SendAsync(request).Result;
                }
                catch (Exception ex)
                {
                    MessageBox.Show("Error. Message: " + ex.Message);
                }
            }
        }
    }
}