const    {app, BrowserWindow, Tray,Notification} = require('electron');
const socket =  require('socket.io-client').connect('http://localhost:3005',{reconnect:true});
const notifier = require('electron-notifications');
// const ElectronWindowsNotifications = require('electron-windows-notifications');
const path = require('path');
const url = require('url');
let win;
let tray;
let iconPath ;
let winNotification;
function createWindow  (){
win = new BrowserWindow ({
    height :500,
    width:300,
    frame:true,
    resizable:true,
    show:false
});
win.loadURL(
    url.format({
        pathname:path.join(__dirname,'/src/index.html'),
        protocol:"file:",
        slashes: true

    })
);
const iconName  =  'blockchainicon.png';
iconPath = path.join(__dirname,`./src/assets/${iconName}`);
tray = new Tray(iconPath);
tray.on('click', ()=>{
win.isVisible() ? win.hide() : win.show();

});

win.on('show', () => {
  tray.setHighlightMode('always')
})
win.on('hide', () => {
  tray.setHighlightMode('never')
  tray.setToolTip('This is my application.')
})



win.on ("closed", ()=>{

    win = null;
})


}

app.on("ready",()=>{
  createWindow();
  
  

  // Add a connect listener

  socket.on('connect', (ioSocket)=> {
    console.log('Connected!');
    windowsNotifications('Application ready for Mining');
    socket.emit('registerMineNode', 'addressofthecurrentnode', 'test msg');
    socket.on('ReceiveTransactions', function(data){
                  console.log('Confirmed registered Node');
                  console.log('Data: ',data);
                  windowsNotifications('Received Transactions');
              });
      });

  // socket.emit('registerMineNode', 'msg2');
// console.log('emit socket connection');
  

});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit()
    }
  });
  
  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow()
    }
  });

  

function windowsNotifications(msg)
{

  // let myNotification = new Notification('Title', {
  //   body: 'Lorem Ipsum Dolor Sit Amet'
  // })

  
  winNotification = notifier.notify('Miner Node', {
      message: msg,
      duration: 10000,
      flat:true,
      vertical:true,
      icon: iconPath,
      buttons: [''],  
  }
);

}

function register_mining_node(){
//Register Mining node to the server using socket io.
// Receive a message from the server on successful registration
  console.log({note:'Mining Node registered successfully'});
} 


function ping_keep_alive_mining_node(){
  //Receive ping keep alive request via socket io
  // send response of active node to the server
    console.log({note:'Mining Node registered successfully'});
  }


  

