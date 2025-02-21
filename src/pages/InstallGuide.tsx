import React from 'react';
import { Smartphone, Share2, Plus, ArrowRight } from 'lucide-react';

export function InstallGuide() {
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
        <div className="flex items-center mb-8">
          <Smartphone className="h-8 w-8 text-emerald-600 mr-3" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Install Islamic Hub on Your Device</h1>
        </div>

        <div className="space-y-12">
          {/* Android Section */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <img src="https://raw.githubusercontent.com/lipis/flag-icons/main/flags/4x3/android.svg" 
                   alt="Android" 
                   className="w-6 h-6 mr-2" />
              Install on Android
            </h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <ol className="space-y-4">
                    <li className="flex items-start">
                      <span className="flex-shrink-0 w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center mr-3">1</span>
                      <p>Visit Islamic Hub in Chrome or any modern browser</p>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center mr-3">2</span>
                      <p>When prompted, tap "Install" on the installation banner that appears at the bottom of the screen</p>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center mr-3">3</span>
                      <p>The app will be installed and added to your home screen</p>
                    </li>
                  </ol>
                </div>
                <div className="flex items-center justify-center">
                 
                </div>
              </div>
            </div>
          </section>

          {/* iOS Section */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <img src="https://raw.githubusercontent.com/lipis/flag-icons/main/flags/4x3/ios.svg" 
                   alt="iOS" 
                   className="w-6 h-6 mr-2" />
              Install on iPhone/iPad
            </h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <ol className="space-y-4">
                    <li className="flex items-start">
                      <span className="flex-shrink-0 w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center mr-3">1</span>
                      <div>
                        <p>Open Islamic Hub in Safari</p>
                        <p className="text-sm text-red-600 mt-1">Important: This only works in Safari browser!</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center mr-3">2</span>
                      <div>
                        <p>Tap the Share button <Share2 className="h-4 w-4 inline mx-1" /></p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center mr-3">3</span>
                      <div>
                        <p>Scroll down and tap "Add to Home Screen" <Plus className="h-4 w-4 inline mx-1" /></p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center mr-3">4</span>
                      <div>
                        <p>Tap "Add" in the top right corner</p>
                      </div>
                    </li>
                  </ol>
                </div>
                <div className="flex items-center justify-center">
                  <img 
                    src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&auto=format&fit=crop&q=80" 
                    alt="iOS Installation" 
                    className="rounded-lg shadow-lg max-w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">App Features</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-emerald-50 p-6 rounded-lg">
                <h3 className="font-semibold text-emerald-800 mb-2">Works Offline</h3>
                <p className="text-emerald-600">Access prayer times and saved content even without internet connection</p>
              </div>
              <div className="bg-emerald-50 p-6 rounded-lg">
                <h3 className="font-semibold text-emerald-800 mb-2">Prayer Notifications</h3>
                <p className="text-emerald-600">Get timely reminders for each prayer with customizable alerts</p>
              </div>
              <div className="bg-emerald-50 p-6 rounded-lg">
                <h3 className="font-semibold text-emerald-800 mb-2">Native Experience</h3>
                <p className="text-emerald-600">Feels and works like a native app with smooth navigation</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}