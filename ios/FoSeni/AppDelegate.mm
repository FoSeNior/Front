#import "AppDelegate.h"
#import <React/RCTRootView.h>
#import <ReactNativeGestureHandler/ReactNativeGestureHandler.h> // Import GestureHandler

#import <React/RCTBundleURLProvider.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  // Wrap RCTRootView with RNGestureHandlerEnabledRootView
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:[self bridge]
                                                  moduleName:@"FoSeni"
                                           initialProperties:self.initialProps];
  UIView *rootViewContainer = [[RNGestureHandlerEnabledRootView alloc] initWithFrame:[UIScreen mainScreen].bounds];
  [rootViewContainer addSubview:rootView];
  rootView.frame = rootViewContainer.bounds;

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  self.window.rootViewController = [UIViewController new];
  self.window.rootViewController.view = rootViewContainer;
  [self.window makeKeyAndVisible];

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

- (NSURL *)bundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
