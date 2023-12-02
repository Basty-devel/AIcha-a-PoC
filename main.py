import os
import sys
from PyQt6 import QtCore
from PyQt6.QtCore import QUrl
from PyQt6.QtGui import QKeySequence, QAction
from PyQt6.QtWidgets import QApplication, QBoxLayout, QMainWindow, QLineEdit, QToolBar, QStatusBar, QProgressBar
from PyQt6.QtWebEngineWidgets import QWebEngineView

class MainWindow(QMainWindow):
    def __init__(self):
        super(MainWindow, self).__init__()
        self.setGeometry(300, 200, 500, 400)

        # Add CSS to the widget
        self.setStyleSheet("""
            QWidget {
                background-color: #222;
                color: #fff;
                font-family: Arial, sans-serif;
            }
            QPushButton {
                background-color: #007BFF;
                color: #fff;
                border: none;
                padding: 15px 30px;
                font-size: 18px;
                border-radius: 5px;
                transition: background-color 0.3s ease;
            }
            QPushButton:hover {
                background-color: #0056b3;
            }
            QLabel {
                font-size: 24px;
                color: #007BFF;
                margin-bottom: 20px;
            }
        """)

        # Create a web view
        self.web_view = QWebEngineView()
        self.web_view.setUrl(QUrl("aicha.html"))
        self.setCentralWidget(self.web_view)

        # Create a toolbar
        toolbar = QToolBar()
        self.addToolBar(toolbar)

        # Add a back action to the toolbar
        back_action = QAction("Back", self)
        back_action.setShortcut(QKeySequence("Back"))
        back_action.triggered.connect(self.web_view.back)
        toolbar.addAction(back_action)

        # Add a forward action to the toolbar
        forward_action = QAction("Forward", self)
        forward_action.setShortcut(QKeySequence("Forward"))
        forward_action.triggered.connect(self.web_view.forward)
        toolbar.addAction(forward_action)

        # Add a reload action to the toolbar
        reload_action = QAction("Reload", self)
        reload_action.setShortcut(QKeySequence("Refresh"))
        reload_action.triggered.connect(self.web_view.reload)
        toolbar.addAction(reload_action)

        # Add a search bar to the toolbar
        self.search_bar = QLineEdit()
        self.search_bar.returnPressed.connect(self.load_url)
        toolbar.addWidget(self.search_bar)

        # Create a status bar
        self.status_bar = QStatusBar()
        self.setStatusBar(self.status_bar)

        # Add a message to the status bar
        self.status_bar.showMessage("Ready")

        # Create a progress bar
        self.progress_bar = QProgressBar()
        self.status_bar.addPermanentWidget(self.progress_bar)

    def load_url(self):
        url = self.search_bar.text()
        if not url.startswith("http"):
            url = "https://" + url
        self.web_view.load(QUrl(url))

if __name__ == "__main__":
    app = QApplication(sys.argv)
    QApplication.setApplicationDisplayName('Loca-Devel by S. Nestler')
    QApplication.setApplicationName('Loca-Devel by S. Nestler')
    QApplication.setApplicationVersion('0.01 alpha')
    window = MainWindow()
    window.show()
    app.exec()
