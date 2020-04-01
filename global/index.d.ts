// This Source Code Form is subject to the terms of the Mozilla Public
// license, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

interface EvListener<T extends Function> {
  addListener: (callback: T) => void;
  removeListener: (listener: T) => void;
  hasListener: (listener: T) => boolean;
}

type Listener<T> = EvListener<(arg: T) => void>;

declare namespace browser.accounts { /* TODO: not yet */ }

declare namespace browser.addressBooks { /* TODO: not yet */ }

declare namespace browser.browserAction {
  type ColorArray = [number, number, number, number];
  type ImageDataType = ImageData;

  function setTitle(details: { title: string | null; tabId?: number }): void;
  function getTitle(details: { tabId?: number }): Promise<string>;

  type IconViaPath = {
    path: string | { [size: number]: string };
    tabId?: number;
  };

  type IconViaImageData = {
    imageData: ImageDataType | { [size: number]: ImageDataType };
    tabId?: number;
  };

  type IconReset = {
    imageData?: {} | null;
    path?: {} | null;
    tabId?: number;
  };

  function setIcon(
    details: IconViaPath | IconViaImageData | IconReset
  ): Promise<void>;
  function setPopup(details: { popup: string | null; tabId?: number }): void;
  function getPopup(details: { tabId?: number }): Promise<string>;
  function openPopup(): Promise<void>;
  function setBadgeText(details: { text: string | null; tabId?: number }): void;
  function getBadgeText(details: { tabId?: number }): Promise<string>;
  function setBadgeBackgroundColor(details: {
    color: string | ColorArray | null;
    tabId?: number;
  }): void;
  function getBadgeBackgroundColor(details: {
    tabId?: number;
  }): Promise<ColorArray>;
  function setBadgeTextColor(details: {
    color: string | ColorArray;
    tabId?: number;
  }): void;
  function setBadgeTextColor(details: {
    color: string | ColorArray;
    windowId?: number;
  }): void;
  function setBadgeTextColor(details: { color: null; tabId?: number }): void;
  function getBadgeTextColor(details: { tabId?: string }): Promise<ColorArray>;
  function getBadgeTextColor(details: {
    windowId?: string;
  }): Promise<ColorArray>;
  function enable(tabId?: number): void;
  function disable(tabId?: number): void;

  const onClicked: Listener<browser.tabs.Tab>;
}

declare namespace browser.cloudFile { /* TODO: not yet. */ }

declare namespace browser.commands {
  type Command = {
    name?: string;
    description?: string;
    shortcut?: string;
  };

  function getAll(): Promise<Command[]>;

  const onCommand: Listener<string>;
}

declare namespace browser.compose { /* TODO: not yet. */ }

declare namespace browser.composeAction { /* TODO: not yet. */ }

declare namespace browser.contacts { /* TODO: not yet. */ }

declare namespace browser.folders {
  type MailFolder = {
    accountId: string;
    path: string;
    name?: string;
    subFolders?: MailFolder[];
    type?: string;
  }
}

declare namespace browser.legacy { /* TODO: not yet. */ }

declare namespace browser.mailingLists { /* TODO: not yet. */ }

declare namespace browser.mailTabs {
  type MailTab = {
    active: boolean;
    displayedFolder: browser.folders.MailFolder;
    folderPaneVisible: boolean;
    id: number;
    layout: string;
    messagePaneVisible: boolean;
    sortOrder: string;
    sortType: string;
    windowId: number;
  }

  function query(queryInfo: {
    active?: boolean;
    currentWindow?: boolean;
    lastFocusedWindow?: boolean;
    windowId?: number;
  }): Promise<MailTab[]>

  function getSelectedMessages(
    tabId?: number
  ): Promise<browser.messages.MessageList>

  const onDisplayedFolderChanged: EvListener<() => void>
  const onSelectedMessagesChanged: EvListener<() => void>
}

declare namespace browser.menus {
  type ContextType =
    | "all"
    | "page"
    | "frame"
    | "selection"
    | "link"
    | "editable"
    | "password"
    | "image"
    | "video"
    | "audio"
    | "browser_action"
    | "tab"
    | "message_list"
    | "folder_pane";

  type ItemType = "normal" | "checkbox" | "radio" | "separator";

  type ModfierType = "Shift" | "Alt" | "Command" | "Ctrl" | "MacCtrl";

  type OnClickData = {
    editable: boolean;
    menuItemId: number | string;
    modifiers: ModfierType[];
    button?: number;
    checked?: boolean;
    displayedFolder?: browser.folders.MailFolder;
    frameId?: number;
    frameUrl?: string;
    linkText?: string;
    linkUrl?: string;
    mediaType?: string;
    pageUrl?: string;
    parentMenuItemId?: number | string;
    selectedFolder?: browser.folders.MailFolder;
    selectedMessages?: browser.messages.MessageList;
    selectionText?: string;
    srcUrl?: string;
    targetElementId?: number;
    viewType?: browser.extension.ViewType;
    wasChecked?: boolean;
  };

  const ACTION_MENU_TOP_LEVEL_LIMIT: number;

  function create(
    createProperties: {
      checked?: boolean;
      command?:
        | "_execute_browser_action";
        // | "_execute_page_action" unsupported
        // | "_execute_sidebar_action" unsupported
      contexts?: ContextType[];
      documentUrlPatterns?: string[];
      enabled?: boolean;
      icons?: object;
      id?: string;
      onclick?: (info: OnClickData, tab: browser.tabs.Tab) => void;
      parentId?: number | string;
      targetUrlPatterns?: string[];
      title?: string;
      type?: ItemType;
      viewTypes?: browser.extension.ViewType[];
      visible?: boolean;
    },
    callback?: () => void
  ): Promise<number | string>;

  function update(
    id: number | string,
    updateProperties: {
      checked?: boolean;
      contexts?: ContextType[];
      documentUrlPatterns?: string[];
      enabled?: boolean;
      icons?: object;
      onclick?: (info: OnClickData, tab: browser.tabs.Tab) => void;
      parentId?: number | string;
      targetUrlPatterns?: string[];
      title?: string;
      type?: ItemType;
      viewTypes?: browser.extension.ViewType[];
      visible?: boolean;
    }
  ): Promise<void>;

  function remove(menuItemId: number | string): Promise<void>;

  function removeAll(): Promise<void>;

  function overrideContext(
    contextOptions: {
      contenxt?: "tab";
      showDefaults?: boolean;
      tabId?: number;
    }
  ): Promise<void>;

  function refresh(): Promise<void>;

  const onClicked: EvListener<
    (info: OnClickData, tab?: browser.tabs.Tab) => void
  >;

  const onShown: EvListener<(info: OnClickData, tab: browser.tabs.Tab) => void>;

  const onHidden: EvListener<() => void>;
}

declare namespace browser.messageDisplay {
  const onMessageDisplayed: EvListener<(
    tabId: number,
    message: browser.messages.MessageHeader
  ) => void>
}

declare namespace browser.messageDisplayAction { /* TODO: not yet. */ }

declare namespace browser.messages {
  type MessageList = {
    id: string;
    messages: MessageHeader[];
  }

  type MessageHeader = {
    author: string;
    bccList: string[];
    ccList: string[];
    date: Date;
    flagged: boolean;
    folder: browser.folders.MailFolder;
    id: number;
    junk: boolean;
    junkScore: number;
    read: boolean;
    recipients: string[];
    subject: string;
    tags: string[];
  }
}

declare namespace browser.tabs {
  type MutedInfoReason = "capture" | "extension" | "user";
  type MutedInfo = {
    muted: boolean;
    extensionId?: string;
    reason: MutedInfoReason;
  };
  // TODO: Specify PageSettings properly.
  type PageSettings = object;
  type Tab = {
    active: boolean;
    audible?: boolean;
    autoDiscardable?: boolean;
    cookieStoreId?: string;
    discarded?: boolean;
    favIconUrl?: string;
    height?: number;
    hidden: boolean;
    highlighted: boolean;
    id?: number;
    incognito: boolean;
    index: number;
    isArticle: boolean;
    isInReaderMode: boolean;
    lastAccessed: number;
    mutedInfo?: MutedInfo;
    openerTabId?: number;
    pinned: boolean;
    selected: boolean;
    sessionId?: string;
    status?: string;
    title?: string;
    url?: string;
    width?: number;
    windowId: number;
  };

  type TabStatus = "loading" | "complete";
  type WindowType = "normal" | "popup" | "panel" | "devtools";
  type ZoomSettingsMode = "automatic" | "disabled" | "manual";
  type ZoomSettingsScope = "per-origin" | "per-tab";
  type ZoomSettings = {
    defaultZoomFactor?: number;
    mode?: ZoomSettingsMode;
    scope?: ZoomSettingsScope;
  };

  const TAB_ID_NONE: number;

  function connect(
    tabId: number,
    connectInfo?: { name?: string; frameId?: number }
  ): browser.runtime.Port;
  function create(createProperties: {
    active?: boolean;
    cookieStoreId?: string;
    index?: number;
    openerTabId?: number;
    pinned?: boolean;
    // deprecated: selected: boolean,
    url?: string;
    windowId?: number;
  }): Promise<Tab>;
  function captureTab(
    tabId?: number,
    options?: browser.extensionTypes.ImageDetails
  ): Promise<string>;
  function captureVisibleTab(
    windowId?: number,
    options?: browser.extensionTypes.ImageDetails
  ): Promise<string>;
  function detectLanguage(tabId?: number): Promise<string>;
  function duplicate(tabId: number): Promise<Tab>;
  function executeScript(
    tabId: number | undefined,
    details: browser.extensionTypes.InjectDetails
  ): Promise<object[]>;
  function get(tabId: number): Promise<Tab>;
  // deprecated: function getAllInWindow(): x;
  function getCurrent(): Promise<Tab>;
  // deprecated: function getSelected(windowId?: number): Promise<browser.tabs.Tab>;
  function getZoom(tabId?: number): Promise<number>;
  function getZoomSettings(tabId?: number): Promise<ZoomSettings>;
  function hide(tabIds: number | number[]): Promise<number[]>;
  // unsupported: function highlight(highlightInfo: {
  //     windowId?: number,
  //     tabs: number[]|number,
  // }): Promise<browser.windows.Window>;
  function insertCSS(
    tabId: number | undefined,
    details: browser.extensionTypes.InjectDetailsCSS
  ): Promise<void>;
  function removeCSS(
    tabId: number | undefined,
    details: browser.extensionTypes.InjectDetails
  ): Promise<void>;
  function move(
    tabIds: number | number[],
    moveProperties: {
      windowId?: number;
      index: number;
    }
  ): Promise<Tab | Tab[]>;
  function print(): Promise<void>;
  function printPreview(): Promise<void>;
  function query(queryInfo: {
    active?: boolean;
    audible?: boolean;
    // unsupported: autoDiscardable?: boolean,
    cookieStoreId?: string;
    currentWindow?: boolean;
    discarded?: boolean;
    hidden?: boolean;
    highlighted?: boolean;
    index?: number;
    muted?: boolean;
    lastFocusedWindow?: boolean;
    pinned?: boolean;
    status?: TabStatus;
    title?: string;
    url?: string | string[];
    windowId?: number;
    windowType?: WindowType;
  }): Promise<Tab[]>;
  function reload(
    tabId?: number,
    reloadProperties?: { bypassCache?: boolean }
  ): Promise<void>;
  function remove(tabIds: number | number[]): Promise<void>;
  function saveAsPDF(
    pageSettings: PageSettings
  ): Promise<"saved" | "replaced" | "canceled" | "not_saved" | "not_replaced">;
  function sendMessage<T = any, U = object>(
    tabId: number,
    message: T,
    options?: { frameId?: number }
  ): Promise<U | void>;
  // deprecated: function sendRequest(): x;
  function setZoom(
    tabId: number | undefined,
    zoomFactor: number
  ): Promise<void>;
  function setZoomSettings(
    tabId: number | undefined,
    zoomSettings: ZoomSettings
  ): Promise<void>;
  function show(tabIds: number | number[]): Promise<void>;
  function toggleReaderMode(tabId?: number): Promise<void>;
  function update(
    tabId: number | undefined,
    updateProperties: {
      active?: boolean;
      // unsupported: autoDiscardable?: boolean,
      // unsupported: highlighted?: boolean,
      // unsupported: hidden?: boolean;
      loadReplace?: boolean;
      muted?: boolean;
      openerTabId?: number;
      pinned?: boolean;
      // deprecated: selected?: boolean,
      url?: string;
    }
  ): Promise<Tab>;

  const onActivated: Listener<{ tabId: number; windowId: number }>;
  const onAttached: EvListener<
    (
      tabId: number,
      attachInfo: {
        newWindowId: number;
        newPosition: number;
      }
    ) => void
  >;
  const onCreated: Listener<Tab>;
  const onDetached: EvListener<
    (
      tabId: number,
      detachInfo: {
        oldWindowId: number;
        oldPosition: number;
      }
    ) => void
  >;
  const onHighlighted: Listener<{ windowId: number; tabIds: number[] }>;
  const onMoved: EvListener<
    (
      tabId: number,
      moveInfo: {
        windowId: number;
        fromIndex: number;
        toIndex: number;
      }
    ) => void
  >;
  const onRemoved: EvListener<
    (
      tabId: number,
      removeInfo: {
        windowId: number;
        isWindowClosing: boolean;
      }
    ) => void
  >;
  const onReplaced: EvListener<
    (addedTabId: number, removedTabId: number) => void
  >;
  const onUpdated: EvListener<
    (
      tabId: number,
      changeInfo: {
        audible?: boolean;
        discarded?: boolean;
        favIconUrl?: string;
        mutedInfo?: MutedInfo;
        pinned?: boolean;
        status?: string;
        title?: string;
        url?: string;
      },
      tab: Tab
    ) => void
  >;
  const onZoomChanged: Listener<{
    tabId: number;
    oldZoomFactor: number;
    newZoomFactor: number;
    zoomSettings: ZoomSettings;
  }>;
}

declare namespace browser.windows {
  type WindowType = "normal" | "popup" | "panel" | "devtools";

  type WindowState =
    | "normal"
    | "minimized"
    | "maximized"
    | "fullscreen"
    | "docked";

  type Window = {
    id?: number;
    focused: boolean;
    top?: number;
    left?: number;
    width?: number;
    height?: number;
    tabs?: browser.tabs.Tab[];
    incognito: boolean;
    type?: WindowType;
    state?: WindowState;
    alwaysOnTop: boolean;
    sessionId?: string;
  };

  type CreateType = "normal" | "popup" | "panel" | "detached_panel";

  const WINDOW_ID_NONE: number;

  const WINDOW_ID_CURRENT: number;

  function get(
    windowId: number,
    getInfo?: {
      populate?: boolean;
      windowTypes?: WindowType[];
    }
  ): Promise<browser.windows.Window>;

  function getCurrent(getInfo?: {
    populate?: boolean;
    windowTypes?: WindowType[];
  }): Promise<browser.windows.Window>;

  function getLastFocused(getInfo?: {
    populate?: boolean;
    windowTypes?: WindowType[];
  }): Promise<browser.windows.Window>;

  function getAll(getInfo?: {
    populate?: boolean;
    windowTypes?: WindowType[];
  }): Promise<browser.windows.Window[]>;

  // TODO: url and tabId should be exclusive
  function create(createData?: {
    allowScriptsToClose?: boolean;
    url?: string | string[];
    tabId?: number;
    left?: number;
    top?: number;
    width?: number;
    height?: number;
    // unsupported: focused?: boolean,
    incognito?: boolean;
    titlePreface?: string;
    type?: CreateType;
    state?: WindowState;
  }): Promise<browser.windows.Window>;

  function update(
    windowId: number,
    updateInfo: {
      left?: number;
      top?: number;
      width?: number;
      height?: number;
      focused?: boolean;
      drawAttention?: boolean;
      state?: WindowState;
    }
  ): Promise<browser.windows.Window>;

  function remove(windowId: number): Promise<void>;

  const onCreated: Listener<browser.windows.Window>;

  const onRemoved: Listener<number>;

  const onFocusChanged: Listener<number>;
}

// The following APIs are also included and work as they do in Firefox

declare namespace browser.contentScripts {
  type RegisteredContentScriptOptions = {
    allFrames?: boolean;
    css?: ({ file: string } | { code: string })[];
    excludeGlobs?: string[];
    excludeMatches?: string[];
    includeGlobs?: string[];
    js?: ({ file: string } | { code: string })[];
    matchAboutBlank?: boolean;
    matches: string[];
    runAt?: "document_start" | "document_end" | "document_idle";
  };

  type RegisteredContentScript = {
    unregister: () => void;
  };

  function register(
    contentScriptOptions: RegisteredContentScriptOptions
  ): Promise<RegisteredContentScript>;
}

declare namespace browser.experiments { /* TODO: not yet. */ }

declare namespace browser.extension {
  type ViewType = "tab" | "popup" | "sidebar"; // | "notification";

  const lastError: string | null;
  const inIncognitoContext: boolean;

  function getURL(path: string): string;
  function getViews(fetchProperties?: {
    type?: ViewType;
    windowId?: number;
  }): Window[];
  function getBackgroundPage(): Window;
  function isAllowedIncognitoAccess(): Promise<boolean>;
  function isAllowedFileSchemeAccess(): Promise<boolean>;
  // unsupported: events as they are deprecated
}

declare namespace browser.extensionTypes {
  type ImageFormat = "jpeg" | "png";
  type ImageDetails = {
    format: ImageFormat;
    quality: number;
  };
  type RunAt = "document_start" | "document_end" | "document_idle";
  type InjectDetails = {
    allFrames?: boolean;
    code?: string;
    file?: string;
    frameId?: number;
    matchAboutBlank?: boolean;
    runAt?: RunAt;
  };
  type InjectDetailsCSS = InjectDetails & { cssOrigin?: "user" | "author" };
}

declare namespace browser.i18n {
  type LanguageCode = string;

  function getAcceptLanguages(): Promise<LanguageCode[]>;

  function getMessage(
    messageName: string,
    substitutions?: string | string[]
  ): string;

  function getUILanguage(): LanguageCode;

  function detectLanguage(
    text: string
  ): Promise<{
    isReliable: boolean;
    languages: { language: LanguageCode; percentage: number }[];
  }>;
}

declare namespace browser.management {
  type ExtensionInfo = {
    description: string;
    // unsupported: disabledReason: string,
    enabled: boolean;
    homepageUrl: string;
    hostPermissions: string[];
    icons: { size: number; url: string }[];
    id: string;
    installType: "admin" | "development" | "normal" | "sideload" | "other";
    mayDisable: boolean;
    name: string;
    // unsupported: offlineEnabled: boolean,
    optionsUrl: string;
    permissions: string[];
    shortName: string;
    // unsupported: type: string,
    updateUrl: string;
    version: string;
    // unsupported: versionName: string,
  };

  function getSelf(): Promise<ExtensionInfo>;
  function uninstallSelf(options: {
    showConfirmDialog: boolean;
    dialogMessage: string;
  }): Promise<void>;
}

declare namespace browser.permissions {
  type Permission =
    | "activeTab"
    | "alarms"
    | "background"
    | "bookmarks"
    | "browsingData"
    | "browserSettings"
    | "clipboardRead"
    | "clipboardWrite"
    | "contextMenus"
    | "contextualIdentities"
    | "cookies"
    | "downloads"
    | "downloads.open"
    | "find"
    | "geolocation"
    | "history"
    | "identity"
    | "idle"
    | "management"
    | "menus"
    | "nativeMessaging"
    | "notifications"
    | "pkcs11"
    | "privacy"
    | "proxy"
    | "sessions"
    | "storage"
    | "tabs"
    | "theme"
    | "topSites"
    | "unlimitedStorage"
    | "webNavigation"
    | "webRequest"
    | "webRequestBlocking";

  type Permissions = {
    origins?: string[];
    permissions?: Permission[];
  };

  function contains(permissions: Permissions): Promise<boolean>;

  function getAll(): Promise<Permissions>;

  function remove(permissions: Permissions): Promise<boolean>;

  function request(permissions: Permissions): Promise<boolean>;

  // Not yet support in Edge and Firefox:
  // const onAdded: Listener<Permissions>;
  // const onRemoved: Listener<Permissions>;
}

declare namespace browser.pkcs11 { /* TODO: not yet. */ }

declare namespace browser.runtime {
  const lastError: string | null;
  const id: string;

  type Port = {
    name: string;
    disconnect(): void;
    error: object;
    onDisconnect: Listener<Port>;
    onMessage: Listener<object>;
    postMessage: <T = object>(message: T) => void;
    sender?: runtime.MessageSender;
  };

  type MessageSender = {
    tab?: browser.tabs.Tab;
    frameId?: number;
    id?: string;
    url?: string;
    tlsChannelId?: string;
  };

  type PlatformOs = "mac" | "win" | "android" | "cros" | "linux" | "openbsd";
  type PlatformArch = "arm" | "x86-32" | "x86-64";
  type PlatformNaclArch = "arm" | "x86-32" | "x86-64";

  type PlatformInfo = {
    os: PlatformOs;
    arch: PlatformArch;
  };

  // type RequestUpdateCheckStatus = "throttled" | "no_update" | "update_available";
  type OnInstalledReason =
    | "install"
    | "update"
    | "chrome_update"
    | "shared_module_update";
  type OnRestartRequiredReason = "app_update" | "os_update" | "periodic";

  type FirefoxSpecificProperties = {
    id?: string;
    strict_min_version?: string;
    strict_max_version?: string;
    update_url?: string;
  };

  type IconPath = { [urlName: string]: string } | string;

  type Manifest = {
    // Required
    manifest_version: 2;
    name: string;
    version: string;
    /** Required in Microsoft Edge */
    author?: string;

    // Optional

    // ManifestBase
    description?: string;
    homepage_url?: string;
    short_name?: string;

    // WebExtensionManifest
    background?: {
      page: string;
      scripts: string[];
      persistent?: boolean;
    };
    content_scripts?: {
      matches: string[];
      exclude_matches?: string[];
      include_globs?: string[];
      exclude_globs?: string[];
      css?: string[];
      js?: string[];
      all_frames?: boolean;
      match_about_blank?: boolean;
      run_at?: "document_start" | "document_end" | "document_idle";
    }[];
    content_security_policy?: string;
    developer?: {
      name?: string;
      url?: string;
    };
    icons?: {
      [imgSize: string]: string;
    };
    incognito?: "spanning" | "split" | "not_allowed";
    optional_permissions?: browser.permissions.Permission[];
    options_ui?: {
      page: string;
      browser_style?: boolean;
      chrome_style?: boolean;
      open_in_tab?: boolean;
    };
    permissions?: browser.permissions.Permission[];
    web_accessible_resources?: string[];

    // WebExtensionLangpackManifest
    languages: {
      [langCode: string]: {
        chrome_resources: {
          [resName: string]: string | { [urlName: string]: string };
        };
        version: string;
      };
    };
    langpack_id?: string;
    sources?: {
      [srcName: string]: {
        base_path: string;
        paths?: string[];
      };
    };

    // Extracted from components
    browser_action?: {
      default_title?: string;
      default_icon?: IconPath;
      theme_icons?: {
        light: string;
        dark: string;
        size: number;
      }[];
      default_popup?: string;
      browser_style?: boolean;
      default_area?: "navbar" | "menupanel" | "tabstrip" | "personaltoolbar";
    };
    commands?: {
      [keyName: string]: {
        suggested_key?: {
          default?: string;
          mac?: string;
          linux?: string;
          windows?: string;
          chromeos?: string;
          android?: string;
          ios?: string;
        };
        description?: string;
      };
    };
    default_locale?: browser.i18n.LanguageCode;
    devtools_page?: string;
    omnibox?: {
      keyword: string;
    };
    page_action?: {
      default_title?: string;
      default_icon?: IconPath;
      default_popup?: string;
      browser_style?: boolean;
      show_matches?: string[];
      hide_matches?: string[];
    };
    sidebar_action?: {
      default_panel: string;
      default_title?: string;
      default_icon?: IconPath;
      browser_style?: boolean;
    };

    // Firefox specific
    applications?: {
      gecko?: FirefoxSpecificProperties;
    };
    browser_specific_settings?: {
      gecko?: FirefoxSpecificProperties;
    };
    experiment_apis?: any;
    protocol_handlers?: {
      name: string;
      protocol: string;
      uriTemplate: string;
    };

    // Opera specific
    minimum_opera_version?: string;

    // Chrome specific
    action?: any;
    automation?: any;
    background_page?: any;
    chrome_settings_overrides?: {
      homepage?: string;
      search_provider?: {
        name: string;
        search_url: string;
        keyword?: string;
        favicon_url?: string;
        suggest_url?: string;
        instant_url?: string;
        is_default?: string;
        image_url?: string;
        search_url_post_params?: string;
        instant_url_post_params?: string;
        image_url_post_params?: string;
        alternate_urls?: string[];
        prepopulated_id?: number;
      };
    };
    chrome_ui_overrides?: {
      bookmarks_ui?: {
        remove_bookmark_shortcut?: true;
        remove_button?: true;
      };
    };
    chrome_url_overrides?: {
      newtab?: string;
      bookmarks?: string;
      history?: string;
    };
    content_capabilities?: any;
    converted_from_user_script?: any;
    current_locale?: any;
    declarative_net_request?: any;
    event_rules?: any[];
    export?: {
      whitelist?: string[];
    };
    externally_connectable?: {
      ids?: string[];
      matches?: string[];
      accepts_tls_channel_id?: boolean;
    };
    file_browser_handlers?: {
      id: string;
      default_title: string;
      file_filters: string[];
    }[];
    file_system_provider_capabilities?: {
      source: "file" | "device" | "network";
      configurable?: boolean;
      multiple_mounts?: boolean;
      watchable?: boolean;
    };
    import?: {
      id: string;
      minimum_version?: string;
    }[];
    input_components?: any;
    key?: string;
    minimum_chrome_version?: string;
    nacl_modules?: {
      path: string;
      mime_type: string;
    }[];
    oauth2?: any;
    offline_enabled?: boolean;
    options_page?: string;
    platforms?: any;
    requirements?: any;
    sandbox?: {
      pages: string[];
      content_security_policy?: string;
    }[];
    signature?: any;
    spellcheck?: any;
    storage?: {
      managed_schema: string;
    };
    system_indicator?: any;
    tts_engine?: {
      voice: {
        voice_name: string;
        lang?: string;
        gender?: "male" | "female";
        event_types: (
          | "start"
          | "word"
          | "sentence"
          | "marker"
          | "end"
          | "error")[];
      }[];
    };
    update_url?: string;
    version_name?: string;
  };

  function getBackgroundPage(): Promise<Window>;
  function openOptionsPage(): Promise<void>;
  function getManifest(): Manifest;

  function getURL(path: string): string;
  function setUninstallURL(url: string): Promise<void>;
  function reload(): void;
  // Will not exist: https://bugzilla.mozilla.org/show_bug.cgi?id=1314922
  // function RequestUpdateCheck(): Promise<RequestUpdateCheckStatus>;
  function connect(
    connectInfo?: { name?: string; includeTlsChannelId?: boolean }
  ): Port;
  function connect(
    extensionId?: string,
    connectInfo?: { name?: string; includeTlsChannelId?: boolean }
  ): Port;
  function connectNative(application: string): Port;

  function sendMessage<T = any, U = any>(message: T): Promise<U>;
  function sendMessage<T = any, U = any>(
    message: T,
    options: { includeTlsChannelId?: boolean; toProxyScript?: boolean }
  ): Promise<U>;
  function sendMessage<T = any, U = any>(
    extensionId: string,
    message: T
  ): Promise<U>;
  function sendMessage<T = any, U = any>(
    extensionId: string,
    message: T,
    options?: { includeTlsChannelId?: boolean; toProxyScript?: boolean }
  ): Promise<U>;

  function sendNativeMessage(
    application: string,
    message: object
  ): Promise<object | void>;
  function getPlatformInfo(): Promise<PlatformInfo>;
  function getBrowserInfo(): Promise<{
    name: string;
    vendor: string;
    version: string;
    buildID: string;
  }>;
  // Unsupported: https://bugzilla.mozilla.org/show_bug.cgi?id=1339407
  // function getPackageDirectoryEntry(): Promise<any>;

  const onStartup: Listener<void>;
  const onInstalled: Listener<{
    reason: OnInstalledReason;
    previousVersion?: string;
    id?: string;
  }>;
  // Unsupported
  // const onSuspend: Listener<void>;
  // const onSuspendCanceled: Listener<void>;
  // const onBrowserUpdateAvailable: Listener<void>;
  // const onRestartRequired: Listener<OnRestartRequiredReason>;
  const onUpdateAvailable: Listener<{ version: string }>;
  const onConnect: Listener<Port>;

  const onConnectExternal: Listener<Port>;

  type onMessagePromise = (
    message: object,
    sender: MessageSender,
    sendResponse: (response: object) => boolean
  ) => Promise<void>;

  type onMessageBool = (
    message: object,
    sender: MessageSender,
    sendResponse: (response: object) => Promise<void>
  ) => boolean;

  type onMessageVoid = (
    message: object,
    sender: MessageSender,
    sendResponse: (response: object) => Promise<void>
  ) => void;

  type onMessageEvent = onMessagePromise | onMessageBool | onMessageVoid;
  const onMessage: EvListener<onMessageEvent>;

  const onMessageExternal: EvListener<onMessageEvent>;
}

declare namespace browser.theme {
  type Theme = {
    images: ThemeImages;
    colors: ThemeColors;
    properties?: ThemeProperties;
  };

  type ThemeImages = {
    headerURL: string;
    theme_frame?: string;
    additional_backgrounds?: string[];
  };

  type ThemeColors = {
    accentcolor: string;
    textcolor: string;
    frame?: [number, number, number];
    tab_text?: [number, number, number];
    toolbar?: string;
    toolbar_text?: string;
    toolbar_field?: string;
    toolbar_field_text?: string;
  };

  type ThemeProperties = {
    additional_backgrounds_alignment: Alignment[];
    additional_backgrounds_tiling: Tiling[];
  };

  type Alignment =
    | "bottom"
    | "center"
    | "left"
    | "right"
    | "top"
    | "center bottom"
    | "center center"
    | "center top"
    | "left bottom"
    | "left center"
    | "left top"
    | "right bottom"
    | "right center"
    | "right top";

  type Tiling = "no-repeat" | "repeat" | "repeat-x" | "repeat-y";

  function getCurrent(): Promise<Theme>;
  function getCurrent(windowId: number): Promise<Theme>;
  function update(theme: Theme): Promise<void>;
  function update(windowId: number, theme: Theme): Promise<void>;
  function reset(): Promise<void>;
  function reset(windowId: number): Promise<void>;
}
